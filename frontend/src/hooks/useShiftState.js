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
      comments: '',
      gangStock: false
    });
  }
  return rows;
}

function validateRow(row) {
  // Gang stock rows are always valid (skipped from requirements)
  if (row.gangStock) return [];

  const errs = [];
  const isBlank = s => !s || !String(s).trim();

  // Employee required
  if (isBlank(row.employee)) errs.push('Employee required');

  // Times required and end after start (we allow overnight in your math,
  // but for *basic* validation, ensure both exist)
  if (isBlank(row.startTime)) errs.push('Start time required');
  if (isBlank(row.endTime)) errs.push('End time required');

  // Case count >= 0 and integer
  const cc = Number(row.caseCount);
  if (!Number.isInteger(cc) || cc < 0) errs.push('Case count must be a whole number ≥ 0');

  return errs;
}

function validateShift(rows) {
  const rowErrors = new Map(); // aisle -> string[]
  let invalidRows = 0;

  for (const r of rows) {
    const errs = validateRow(r);
    if (errs.length) invalidRows++;
    if (errs.length) rowErrors.set(r.aisle, errs);
  }
  return { rowErrors, invalidRows, isValid: invalidRows === 0 };
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
    let excludedCount = 0;

    for (const r of shift.rows) {
      if (r.gangStock) { excludedCount++; continue; }
      totalCases += Number(r.caseCount) || 0;
      totalMinutes += effectiveMinutesWorked(r.startTime, r.endTime, r.tookLunch);
    }

    const totalHours = totalMinutes / 60;
    const avgRate = totalHours > 0 ? totalCases / totalHours : 0;

    return { totalCases, totalHours, avgRate, excludedCount };
  }, [shift.rows]);

    const validation = useMemo(() => validateShift(shift.rows), [shift.rows]);

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

  return { shift, updateRow, summary, saveProgress, submitShift, validation };
}
