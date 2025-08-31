import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="w-full p-4 flex items-center justify-between">
      <div className="text-xl font-semibold">HD Notes</div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-gray-600">Welcome, <strong>{user.name}</strong></div>
            <button
              onClick={logout}
              className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
            >
              Sign out
            </button>
          </>
        ) : (
          <div className="text-sm text-gray-600">Not signed in</div>
        )}
      </div>
    </div>
  );
}
