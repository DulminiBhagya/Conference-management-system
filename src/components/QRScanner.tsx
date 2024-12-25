import React, { useState } from 'react';
import { Camera } from 'lucide-react';

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);

  const handleScan = async (data: string) => {
    if (data) {
      try {
        // TODO: Implement check-in logic with Supabase
        console.log('QR Code scanned:', data);
      } catch (error) {
        console.error('Error processing QR code:', error);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">QR Code Scanner</h2>
        <button
          onClick={() => setScanning(!scanning)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Camera className="h-4 w-4 mr-2" />
          {scanning ? 'Stop Scanning' : 'Start Scanning'}
        </button>
      </div>
      {scanning && (
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          {/* TODO: Implement actual QR scanner component */}
          <p className="text-gray-500">Scanner placeholder</p>
        </div>
      )}
    </div>
  );
}