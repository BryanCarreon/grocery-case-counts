// src/utils/time.js
export const LUNCH_MINUTES = 30;

// "22:00" -> minutes since midnight
export function parseHHMM(hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h * 60 + m;
}

// Handles overnight (e.g., 22:00 to 02:00 = 4h = 240min)
export function minutesBetween(startHHMM, endHHMM) {
  const s = parseHHMM(startHHMM);
  const e = parseHHMM(endHHMM);
  if (s == null || e == null) return 0;
  if (e >= s) return e - s;
  // crossed midnight
  return (24 * 60 - s) + e;
}

export function effectiveMinutesWorked(startHHMM, endHHMM, tookLunch) {
  let mins = minutesBetween(startHHMM, endHHMM);
  if (tookLunch) mins = Math.max(0, mins - LUNCH_MINUTES);
  return mins;
}

export function hoursFromMinutes(mins) {
  return mins / 60;
}
