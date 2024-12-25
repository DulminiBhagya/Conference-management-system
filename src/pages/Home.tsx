import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, QrCode } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Conference Management System
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Manage your conference experience with ease. View schedules, register for sessions, and track attendance.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/schedule"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <Calendar className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  View Schedule
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Browse conference tracks and sessions
                </p>
              </div>
            </Link>

            <Link
              to="/sessions"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <Users className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Session Registration
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Register for available sessions
                </p>
              </div>
            </Link>

            <Link
              to="/check-in"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-indigo-50 text-indigo-700 ring-4 ring-white">
                  <QrCode className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Check-in
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Scan QR code for session attendance
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}