/*
  # Add Digital Wallet and Payment System

  1. New Tables
    - `user_wallets`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `balance` (numeric, current wallet balance)
      - `currency` (text, default 'NGN')
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `payment_methods`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `type` (text, card/bank/wallet)
      - `provider` (text, visa/mastercard/gtbank/etc)
      - `account_number` (text, masked card/bank number)
      - `account_name` (text, cardholder/bank account name)
      - `is_default` (boolean, default false)
      - `is_verified` (boolean, default false)
      - `metadata` (jsonb, additional payment data)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `wallet_transactions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `type` (text, credit/debit)
      - `amount` (numeric)
      - `balance_before` (numeric)
      - `balance_after` (numeric)
      - `description` (text)
      - `reference` (text, unique transaction reference)
      - `status` (text, pending/completed/failed)
      - `payment_method_id` (uuid, foreign key to payment_methods, nullable)
      - `order_id` (uuid, foreign key to delivery_orders, nullable)
      - `created_at` (timestamptz)

  2. Enhanced Bidding System (inDrive Model)
    - Add `bid_expiry` to delivery_bids (timestamptz)
    - Add `auto_accept_threshold` to delivery_orders (numeric, auto-accept bids below this amount)
    - Add `min_bid_decrement` to delivery_orders (numeric, minimum bid reduction)
    - Add `current_lowest_bid` to delivery_orders (numeric, track lowest active bid)

  3. Security
    - Enable RLS on all new tables
    - Users can only access their own wallet/payment data
    - Partners can view transaction history for earnings

  4. Indexes
    - Index on user_wallets.user_id
    - Index on payment_methods.user_id
    - Index on wallet_transactions.user_id and created_at
    - Index on delivery_bids.bid_expiry
*/

-- Create user_wallets table
CREATE TABLE IF NOT EXISTS user_wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  balance numeric NOT NULL DEFAULT 0 CHECK (balance >= 0),
  currency text NOT NULL DEFAULT 'NGN',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payment_methods table
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('card', 'bank', 'wallet')),
  provider text NOT NULL,
  account_number text NOT NULL,
  account_name text,
  is_default boolean NOT NULL DEFAULT false,
  is_verified boolean NOT NULL DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wallet_transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('credit', 'debit')),
  amount numeric NOT NULL CHECK (amount > 0),
  balance_before numeric NOT NULL,
  balance_after numeric NOT NULL,
  description text NOT NULL,
  reference text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  payment_method_id uuid REFERENCES payment_methods(id) ON DELETE SET NULL,
  order_id uuid REFERENCES delivery_orders(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Add new columns to delivery_bids for enhanced bidding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'delivery_bids' AND column_name = 'bid_expiry'
  ) THEN
    ALTER TABLE delivery_bids ADD COLUMN bid_expiry timestamptz;
  END IF;
END $$;

-- Add new columns to delivery_orders for inDrive-style bidding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'delivery_orders' AND column_name = 'auto_accept_threshold'
  ) THEN
    ALTER TABLE delivery_orders ADD COLUMN auto_accept_threshold numeric;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'delivery_orders' AND column_name = 'min_bid_decrement'
  ) THEN
    ALTER TABLE delivery_orders ADD COLUMN min_bid_decrement numeric DEFAULT 50;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'delivery_orders' AND column_name = 'current_lowest_bid'
  ) THEN
    ALTER TABLE delivery_orders ADD COLUMN current_lowest_bid numeric;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_wallets_user_id ON user_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_methods_user_id ON payment_methods(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_user_id ON wallet_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_transactions_created_at ON wallet_transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_delivery_bids_bid_expiry ON delivery_bids(bid_expiry);

-- Enable RLS on new tables
ALTER TABLE user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_wallets
CREATE POLICY "Users can view own wallet"
  ON user_wallets FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own wallet"
  ON user_wallets FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for payment_methods
CREATE POLICY "Users can view own payment methods"
  ON payment_methods FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own payment methods"
  ON payment_methods FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own payment methods"
  ON payment_methods FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own payment methods"
  ON payment_methods FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for wallet_transactions
CREATE POLICY "Users can view own transactions"
  ON wallet_transactions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert transactions"
  ON wallet_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to update wallet balance
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
DECLARE
  wallet_record user_wallets%ROWTYPE;
BEGIN
  -- Get or create wallet for user
  SELECT * INTO wallet_record FROM user_wallets WHERE user_id = NEW.user_id;
  IF NOT FOUND THEN
    INSERT INTO user_wallets (user_id, balance) VALUES (NEW.user_id, 0) RETURNING * INTO wallet_record;
  END IF;

  -- Update balance based on transaction type
  IF NEW.type = 'credit' AND NEW.status = 'completed' THEN
    UPDATE user_wallets SET balance = balance + NEW.amount, updated_at = now() WHERE user_id = NEW.user_id;
  ELSIF NEW.type = 'debit' AND NEW.status = 'completed' THEN
    UPDATE user_wallets SET balance = balance - NEW.amount, updated_at = now() WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update wallet balance on transaction
CREATE TRIGGER update_wallet_balance_trigger
  AFTER INSERT ON wallet_transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_wallet_balance();

-- Function to handle auto-accept bids (inDrive style)
CREATE OR REPLACE FUNCTION check_auto_accept_bid()
RETURNS TRIGGER AS $$
DECLARE
  order_record delivery_orders%ROWTYPE;
BEGIN
  -- Get the order
  SELECT * INTO order_record FROM delivery_orders WHERE id = NEW.order_id;

  -- Check if bid is below auto-accept threshold
  IF order_record.auto_accept_threshold IS NOT NULL AND NEW.bid_amount <= order_record.auto_accept_threshold THEN
    -- Auto-accept the bid
    UPDATE delivery_bids SET status = 'accepted' WHERE id = NEW.id;
    UPDATE delivery_orders SET
      bid_status = 'bid_accepted',
      selected_bid_id = NEW.id,
      partner_id = NEW.partner_id,
      status = 'accepted'
    WHERE id = NEW.order_id;

    -- Reject all other pending bids
    UPDATE delivery_bids SET status = 'rejected'
    WHERE order_id = NEW.order_id AND id != NEW.id AND status = 'pending';
  END IF;

  -- Update current lowest bid
  UPDATE delivery_orders SET current_lowest_bid = NEW.bid_amount
  WHERE id = NEW.order_id AND (current_lowest_bid IS NULL OR NEW.bid_amount < current_lowest_bid);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-accept functionality
CREATE TRIGGER check_auto_accept_bid_trigger
  AFTER INSERT ON delivery_bids
  FOR EACH ROW
  EXECUTE FUNCTION check_auto_accept_bid();