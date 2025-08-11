import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'currentShiftDraft';

export default function Dashboard() {
  const nav = useNavigate();

  const hasDraft = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const obj = JSON.parse(raw);
      return Array.isArray(obj?.rows) && obj.rows.length > 0;
    } catch {
      return false;
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Quick actions for your shift.</p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => nav('/shift/current')}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 text-left hover:shadow-md"
        >
          <div className="text-xl font-semibold">
            {hasDraft ? 'Continue Current Shift' : 'Start New Shift'}
          </div>
          <p className="text-gray-600 mt-1">
            Fill the spreadsheet for aisles 6–31.
          </p>
        </button>

        <button
          onClick={() => nav('/shift/history')}
          className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 text-left hover:shadow-md"
        >
          <div className="text-xl font-semibold">View Past Shifts</div>
          <p className="text-gray-600 mt-1">
            See previous submissions and summaries.
          </p>
        </button>
      </div>
    </div>
  );
}
