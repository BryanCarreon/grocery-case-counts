import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function App({ signOut, user }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username} 👋</h1>
      <button onClick={signOut} className="bg-red-500 text-white px-4 py-2 rounded">
        Sign out
      </button>
    </div>
  );
}

export default withAuthenticator(App);
