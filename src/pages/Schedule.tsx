import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Track, Session } from '../types';
import { Clock, MapPin } from 'lucide-react';

export default function Schedule() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [tracksData, sessionsData] = await Promise.all([
          supabase.from('tracks').select('*'),
          supabase.from('sessions').select('*')
        ]);

        if (tracksData.data) setTracks(tracksData.data);
        if (sessionsData.data) setSessions(sessionsData.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-900">Conference Schedule</h2>
      </div>
      <div className="border-t border-gray-200">
        {tracks.map((track) => (
          <div key={track.id} className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{track.title}</h3>
            <div className="space-y-4">
              {sessions
                .filter((session) => session.track_id === track.id)
                .map((session) => (
                  <div
                    key={session.id}
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">{session.title}</h4>
                        <p className="text-sm text-gray-500">{session.speaker}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {session.registered_count}/{session.capacity} registered
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(session.time).toLocaleTimeString()}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {session.venue}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}