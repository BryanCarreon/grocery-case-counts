// Renders headers and all rows (6–31). It receives rows + updateRow from the parent
import React from 'react';
import ShiftRow from './ShiftRow';

export default function ShiftTable({ rows, onUpdateRow, rowErrorsMap }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 text-left text-sm text-gray-700">
          <tr>
            <th className="px-3 py-2 font-semibold">Aisle</th>
            <th className="px-3 py-2 font-semibold">Employee Name</th>
            <th className="px-3 py-2 font-semibold">Start Time</th>
            <th className="px-3 py-2 font-semibold">End Time</th>
            <th className="px-3 py-2 font-semibold text-center">Lunch?</th>
            <th className="px-3 py-2 font-semibold text-center">Gang</th>
            <th className="px-3 py-2 font-semibold">Case Count</th>
            <th className="px-3 py-2 font-semibold">Comments</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <ShiftRow
              key={row.aisle}
              row={row}
              errors={rowErrorsMap?.get(row.aisle) || []}
              onChange={patch => onUpdateRow(row.aisle, patch)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
