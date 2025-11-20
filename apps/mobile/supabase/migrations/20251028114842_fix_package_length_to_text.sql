/*
  # Fix package_length Column Type

  1. Changes
    - Change package_length from numeric to text in delivery_orders table
    - This field is used to store package description, not a numeric measurement
    - The code treats it as a text field for package description

  2. Important Notes
    - This fixes the mismatch between database schema and application code
    - Existing data will be cast to text during the migration
*/

-- Change package_length from numeric to text
ALTER TABLE delivery_orders 
  ALTER COLUMN package_length TYPE text 
  USING package_length::text;