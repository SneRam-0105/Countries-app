```sql
-- Create the protected data table
CREATE TABLE protected_data (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
name TEXT NOT NULL,
description TEXT,
is_active BOOLEAN DEFAULT true,
user_id UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE protected_data ENABLE ROW LEVEL SECURITY;

-- Create policy for reading data
CREATE POLICY "Users can read own data"
ON protected_data
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for inserting data
CREATE POLICY "Users can insert own data"
ON protected_data
FOR INSERT
WITH CHECK (
auth.uid() IS NOT NULL AND
(
user_id IS NULL OR
user_id = auth.uid()
)
);

-- Create trigger to automatically set user_id
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
NEW.user_id := auth.uid();
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS set_user_id_trigger ON protected_data;
CREATE TRIGGER set_user_id_trigger
BEFORE INSERT ON protected_data
FOR EACH ROW
EXECUTE FUNCTION set_user_id();
$$
```
