/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function OTPVerify() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as any;
  const mode = state?.mode || "signup"; // "signup" or "signin"
  const email = state?.email || "";
  const name = state?.name || "";

  const { loginWithToken } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) return setError("Enter a valid OTP");
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = await api.post("/auth/verify-signup", { email, name, otp });
        const token = res.data.token;
        await loginWithToken(token);
        navigate("/dashboard");
      } else {
        const res = await api.post("/auth/verify-signin", { email, otp });
        const token = res.data.token;
        await loginWithToken(token);
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    try {
      await api.post("/auth/resend-otp", { email, mode });
      alert("OTP resent");
    } catch (err) {
      alert("Failed to resend OTP");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md card p-6">
        <h2 className="text-xl font-semibold mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-500 mb-4">Enter the OTP sent to <strong>{email}</strong></p>
        <form onSubmit={submit} className="space-y-3">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter OTP"
          />
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="flex gap-3">
            <button disabled={loading} className="px-4 py-2 bg-brand text-white rounded">
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button type="button" onClick={resend} className="px-4 py-2 border rounded">
              Resend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
