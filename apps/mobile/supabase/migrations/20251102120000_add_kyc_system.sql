/*
  # Add KYC (Know Your Customer) System

  1. New Tables
    - `kyc_documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `document_type` (text, nin/government_id/passport/drivers_license)
      - `document_number` (text, NIN number or document ID)
      - `document_url` (text, URL to uploaded document)
      - `selfie_url` (text, URL to facial recognition selfie)
      - `status` (text, pending/under_review/approved/rejected)
      - `review_notes` (text, admin review comments)
      - `reviewed_by` (uuid, foreign key to profiles - admin user)
      - `reviewed_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `kyc_verification`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `verification_type` (text, facial_recognition/document_verification)
      - `verification_data` (jsonb, facial recognition data or verification results)
      - `confidence_score` (numeric, AI confidence score 0-100)
      - `status` (text, pending/completed/failed)
      - `attempts` (integer, number of verification attempts)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Enhanced Tables
    - Add KYC fields to profiles table:
      - `kyc_status` (text, not_started/pending/under_review/approved/rejected)
      - `kyc_completed_at` (timestamptz)
      - `nin_number` (text, Nigerian NIN)
      - `verification_level` (text, basic/premium/verified)

    - Add KYC requirements to partner_profiles:
      - `kyc_verified` (boolean, default false)
      - `can_accept_jobs` (boolean, default false - controlled by admin)

  3. Security
    - Enable RLS on all new tables
    - Users can only view their own KYC data
    - Admins can view and update all KYC records
    - Partners must be KYC verified to accept jobs

  4. Indexes
    - Index on kyc_documents.user_id and status
    - Index on kyc_documents.document_type
    - Index on kyc_verification.user_id
    - Index on profiles.kyc_status
*/

-- Create kyc_documents table
CREATE TABLE IF NOT EXISTS kyc_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  document_type text NOT NULL CHECK (document_type IN ('nin', 'government_id', 'passport', 'drivers_license')),
  document_number text NOT NULL,
  document_url text,
  selfie_url text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  review_notes text,
  reviewed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create kyc_verification table
CREATE TABLE IF NOT EXISTS kyc_verification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  verification_type text NOT NULL CHECK (verification_type IN ('facial_recognition', 'document_verification', 'biometric')),
  verification_data jsonb DEFAULT '{}',
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 100),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  attempts integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add KYC fields to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'kyc_status'
  ) THEN
    ALTER TABLE profiles ADD COLUMN kyc_status text DEFAULT 'not_started' CHECK (kyc_status IN ('not_started', 'pending', 'under_review', 'approved', 'rejected'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'kyc_completed_at'
  ) THEN
    ALTER TABLE profiles ADD COLUMN kyc_completed_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'nin_number'
  ) THEN
    ALTER TABLE profiles ADD COLUMN nin_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'verification_level'
  ) THEN
    ALTER TABLE profiles ADD COLUMN verification_level text DEFAULT 'basic' CHECK (verification_level IN ('basic', 'premium', 'verified'));
  END IF;
END $$;

-- Add KYC fields to partner_profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'partner_profiles' AND column_name = 'kyc_verified'
  ) THEN
    ALTER TABLE partner_profiles ADD COLUMN kyc_verified boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'partner_profiles' AND column_name = 'can_accept_jobs'
  ) THEN
    ALTER TABLE partner_profiles ADD COLUMN can_accept_jobs boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_kyc_documents_user_id ON kyc_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_kyc_documents_status ON kyc_documents(status);
CREATE INDEX IF NOT EXISTS idx_kyc_documents_type ON kyc_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_kyc_verification_user_id ON kyc_verification(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_kyc_status ON profiles(kyc_status);

-- Enable RLS on new tables
ALTER TABLE kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE kyc_verification ENABLE ROW LEVEL SECURITY;

-- RLS Policies for kyc_documents
CREATE POLICY "Users can view own KYC documents"
  ON kyc_documents FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own KYC documents"
  ON kyc_documents FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own pending KYC documents"
  ON kyc_documents FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid() AND status = 'pending')
  WITH CHECK (user_id = auth.uid() AND status = 'pending');

CREATE POLICY "Admins can view all KYC documents"
  ON kyc_documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update all KYC documents"
  ON kyc_documents FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for kyc_verification
CREATE POLICY "Users can view own verification records"
  ON kyc_verification FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own verification records"
  ON kyc_verification FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all verification records"
  ON kyc_verification FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Function to update KYC status when documents are approved
CREATE OR REPLACE FUNCTION update_kyc_status()
RETURNS TRIGGER AS $$
DECLARE
  user_role text;
  all_approved boolean;
BEGIN
  -- Get user role
  SELECT role INTO user_role FROM profiles WHERE id = NEW.user_id;

  -- Check if all required documents are approved
  SELECT bool_and(status = 'approved') INTO all_approved
  FROM kyc_documents
  WHERE user_id = NEW.user_id;

  IF all_approved THEN
    -- Update profile KYC status
    UPDATE profiles
    SET kyc_status = 'approved',
        kyc_completed_at = now(),
        verification_level = 'verified'
    WHERE id = NEW.user_id;

    -- If user is a partner, update partner profile
    IF user_role IN ('partner', 'both') THEN
      UPDATE partner_profiles
      SET kyc_verified = true,
          can_accept_jobs = true,
          verification_status = 'approved'
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update KYC status
CREATE TRIGGER update_kyc_status_trigger
  AFTER UPDATE ON kyc_documents
  FOR EACH ROW
  WHEN (OLD.status != 'approved' AND NEW.status = 'approved')
  EXECUTE FUNCTION update_kyc_status();

-- Function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_kyc_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_kyc_documents_timestamp
  BEFORE UPDATE ON kyc_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_kyc_updated_at();

CREATE TRIGGER update_kyc_verification_timestamp
  BEFORE UPDATE ON kyc_verification
  FOR EACH ROW
  EXECUTE FUNCTION update_kyc_updated_at();