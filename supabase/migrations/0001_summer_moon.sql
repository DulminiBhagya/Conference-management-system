/*
  # Initial Schema for Conference Management System

  1. New Tables
    - participants
      - id (uuid, primary key)
      - name (text)
      - email (text, unique)
      - organization (text)
      - qr_code (text)
      - created_at (timestamptz)
    
    - tracks
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - created_at (timestamptz)
    
    - sessions
      - id (uuid, primary key)
      - track_id (uuid, foreign key)
      - title (text)
      - speaker (text)
      - time (timestamptz)
      - venue (text)
      - capacity (integer)
      - registered_count (integer)
      - created_at (timestamptz)
    
    - attendance
      - id (uuid, primary key)
      - participant_id (uuid, foreign key)
      - session_id (uuid, foreign key)
      - check_in_time (timestamptz)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create participants table
CREATE TABLE participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  organization text,
  qr_code text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create tracks table
CREATE TABLE tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create sessions table
CREATE TABLE sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid REFERENCES tracks(id),
  title text NOT NULL,
  speaker text NOT NULL,
  time timestamptz NOT NULL,
  venue text NOT NULL,
  capacity integer NOT NULL DEFAULT 50,
  registered_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create attendance table
CREATE TABLE attendance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid REFERENCES participants(id),
  session_id uuid REFERENCES sessions(id),
  check_in_time timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(participant_id, session_id)
);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to tracks"
  ON tracks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to sessions"
  ON sessions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to read participants"
  ON participants
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert participants"
  ON participants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage attendance"
  ON attendance
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);