import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import CurrentShift from './pages/CurrentShift';

function App({ user, signOut }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Grocery Case Counts</div>
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

      <CurrentShift />
    </div>
  );
}

export default withAuthenticator(App);
