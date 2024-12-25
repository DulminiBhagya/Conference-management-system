export interface Participant {
  id: string;
  name: string;
  email: string;
  organization: string;
  qr_code: string;
  created_at: string;
}

export interface Track {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export interface Session {
  id: string;
  track_id: string;
  title: string;
  speaker: string;
  time: string;
  venue: string;
  capacity: number;
  registered_count: number;
  created_at: string;
}

export interface Attendance {
  id: string;
  participant_id: string;
  session_id: string;
  check_in_time: string;
  created_at: string;
}