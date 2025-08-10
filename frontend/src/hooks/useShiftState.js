// Initializes aisles 6–31, loads/saves a draft to localStorage, and exposes helpers
import { useEffect, useMemo, useState } from 'react';
import { effectiveMinutesWorked } from '../utils/time';

const STORAGE_KEY = 'currentShiftDraft';

function makeInitialRows() {
  const rows = [];
  for (let aisle = 6; aisle <= 31; aisle++) {
    rows.push({
      aisle,
      employee: '',
      startTime: '',
      endTime: '',
      tookLunch: false,
      caseCount: 0,
      comments: ''
    });
  }
  return rows;
}

export function useShiftState() {
  const [shift, setShift] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return {
      dateISO: new Date().toISOString().slice(0, 10),
      rows: makeInitialRows()
    };
  });

  // Auto-save draft whenever shift changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shift));
  }, [shift]);

  // Update a single cell in a row by aisle
  function updateRow(aisle, patch) {
    setShift(prev => ({
      ...prev,
      rows: prev.rows.map(r => r.aisle === aisle ? { ...r, ...patch } : r)
    }));
  }

  // Derived metrics (total cases, total hours, avg rate)
  const summary = useMemo(() => {
    let totalCases = 0;
    let totalMinutes = 0;

    for (const r of shift.rows) {
      totalCases += Number(r.caseCount) || 0;
      totalMinutes += effectiveMinutesWorked(r.startTime, r.endTime, r.tookLunch);
    }

    const totalHours = totalMinutes / 60;
    const avgRate = totalHours > 0 ? totalCases / totalHours : 0;

    return { totalCases, totalHours, avgRate };
  }, [shift.rows]);

  // “Save Progress” (just stamps a time; data already auto-saved as draft)
  function saveProgress() {
    setShift(prev => ({ ...prev, lastSavedAt: new Date().toISOString() }));
  }

  // “Submit Shift”: later this will POST to backend. For now we freeze it and clear draft.
  function submitShift() {
    // TODO: call your backend here; await response
    // After success:
    localStorage.removeItem(STORAGE_KEY);
    setShift({
      dateISO: new Date().toISOString().slice(0, 10),
      rows: makeInitialRows(),
      submittedAt: new Date().toISOString()
    });
  }

  return { shift, updateRow, summary, saveProgress, submitShift };
}
