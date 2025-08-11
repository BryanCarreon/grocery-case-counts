import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CurrentShift from './pages/CurrentShift';
import PastShifts from './pages/PastShifts';

function TopNav({ user, signOut }) {
  const loc = useLocation();
  const active = (path) => loc.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600';
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold">Grocery Case Counts</span>
          <Link className={active('/')} to="/">Dashboard</Link>
          <Link className={active('/shift/current')} to="/shift/current">Current Shift</Link>
          <Link className={active('/shift/history')} to="/shift/history">Past Shifts</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{user?.username}</span>
          <button
            onClick={signOut}
            className="px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}

function App({ user, signOut }) {
  return (
    <BrowserRouter>
      <TopNav user={user} signOut={signOut} />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shift/current" element={<CurrentShift />} />
          <Route path="/shift/history" element={<PastShifts />} />
          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
