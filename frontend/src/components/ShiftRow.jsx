// A single row with controlled inputs. Controlled inputs = the UI value is always the value from state; onChange updates state.
// src/components/ShiftRow.jsx
import React from 'react';

export default function ShiftRow({ row, onChange, errors = [] }) {
  const { aisle, employee, startTime, endTime, tookLunch, caseCount, comments, gangStock } = row;

  const errHas = (substr) => errors.some(e => e.toLowerCase().includes(substr));
  const errEmployee = errHas('employee');
  const errStart = errHas('start time');
  const errEnd = errHas('end time');
  const errCases = errHas('case count');

  const baseInput = "border rounded px-2 py-1 text-sm";
  const bad = "border-red-500 focus:ring-red-300";
  const ok = "border-gray-300 focus:ring-gray-300";

  return (
    <tr className={`odd:bg-white even:bg-gray-50 ${gangStock ? 'opacity-60' : ''}`}>
      <td className="px-3 py-2 text-sm font-medium text-gray-800">{aisle}</td>

      <td className="px-3 py-2">
        <input
          className={`w-full ${baseInput} ${errEmployee ? bad : ok}`}
          value={employee}
          onChange={e => onChange({ employee: e.target.value })}
          disabled={gangStock}
          placeholder="Name"
        />
        {errEmployee && <p className="text-xs text-red-600 mt-1">Employee required</p>}
      </td>

      <td className="px-3 py-2">
        <input
          type="time"
          className={`${baseInput} ${errStart ? bad : ok}`}
          value={startTime}
          onChange={e => onChange({ startTime: e.target.value })}
          disabled={gangStock}
        />
        {errStart && <p className="text-xs text-red-600 mt-1">Start time required</p>}
      </td>

      <td className="px-3 py-2">
        <input
          type="time"
          className={`${baseInput} ${errEnd ? bad : ok}`}
          value={endTime}
          onChange={e => onChange({ endTime: e.target.value })}
          disabled={gangStock}
        />
        {errEnd && <p className="text-xs text-red-600 mt-1">End time required</p>}
      </td>

      <td className="px-3 py-2 text-center">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={tookLunch}
          onChange={e => onChange({ tookLunch: e.target.checked })}
          disabled={gangStock}
          title="Deduct lunch"
        />
      </td>

      <td className="px-3 py-2 text-center">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={gangStock}
            onChange={e => onChange({ gangStock: e.target.checked })}
            title="Exclude this aisle from totals & validation"
          />
          <span className="text-sm">Gang</span>
        </label>
      </td>

      <td className="px-3 py-2">
        <input
          type="number"
          min="0"
          className={`w-24 ${baseInput} ${errCases ? bad : ok}`}
          value={caseCount}
          onChange={e => onChange({ caseCount: Number(e.target.value) })}
          disabled={gangStock}
        />
        {errCases && <p className="text-xs text-red-600 mt-1">Cases must be a whole number ≥ 0</p>}
      </td>

      <td className="px-3 py-2">
        <input
          className={`w-full ${baseInput} border-gray-300`}
          value={comments}
          onChange={e => onChange({ comments: e.target.value })}
          placeholder="Notes"
        />
      </td>
    </tr>
  );
}