// Owns the shift state (via the hook), shows summary + buttons, and renders the table
import React from 'react';
import { useShiftState } from '../hooks/useShiftState';
import ShiftTable from '../components/ShiftTable';

export default function CurrentShift() {
  const { shift, updateRow, summary, saveProgress, submitShift, validation } = useShiftState();

  function handleSubmit() {
    if (!validation.isValid) {
      // You could render a modal/toast instead of alert
      alert('Please fix the highlighted rows before submitting.');
      return;
    }
    submitShift();
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Current Shift – <span className="font-mono">{shift.dateISO}</span>
        </h1>
        <div className="flex items-center gap-2">
          {shift.lastSavedAt && (
            <span className="text-xs text-gray-500">
              Draft saved: {new Date(shift.lastSavedAt).toLocaleString()}
            </span>
          )}
          <button
            onClick={saveProgress}
            className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Save Progress
          </button>
          <button
            onClick={handleSubmit}
            disabled={!validation.isValid}
            className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            title="Validate and finalize"
          >
            Submit Shift
          </button>
        </div>
      </header>

      {!validation.isValid && (
        <div className="rounded-lg border border-red-300 bg-red-50 text-red-700 p-3 text-sm">
          {validation.invalidRows} row{validation.invalidRows !== 1 ? 's' : ''} need attention.
        </div>
      )}

      <ShiftTable
        rows={shift.rows}
        onUpdateRow={updateRow}
        rowErrorsMap={validation.rowErrors}
      />

      <footer className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm">
        <div className="flex flex-wrap gap-6 text-sm">
          <div><span className="font-semibold">Total Cases:</span> {summary.totalCases}</div>
          <div><span className="font-semibold">Total Hours:</span> {summary.totalHours.toFixed(2)}</div>
          <div><span className="font-semibold">Avg Cases / Hour:</span> {summary.avgRate.toFixed(2)}</div>
          <div className="text-gray-500">
            <span className="font-semibold">Excluded (Gang):</span> {summary.excludedCount}
          </div>
        </div>
      </footer>
    </div>
  );
}