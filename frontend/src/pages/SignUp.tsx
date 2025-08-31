/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/SignUp.tsx
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

declare global {
  interface Window {
    google: any;
  }
}

export default function SignUp() {
  const navigate = useNavigate();
  const { loginWithToken } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpRequested, setOtpRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const otpRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (otpRequested && otpRef.current) otpRef.current.focus();
  }, [otpRequested]);

  // ---- Google Button Setup ----
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignupBtn"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, []);

  const handleGoogleResponse = async (response: any) => {
    try {
      const res = await api.post("/auth/google", { idToken: response.credential });
      console.log("google signup res", res);
      await loginWithToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google signup failed", err);
      setError("Google signup failed");
    }
  };

  // ---- OTP flow ----
  const validateBase = () => {
    if (!name.trim()) return "Your name is required";
    if (!dob) return "Date of birth is required";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "A valid email is required";
    return null;
  };

  const handleGetOtp = async () => {
    setError(null);
    const v = validateBase();
    if (v) return setError(v);
    setLoading(true);
    try {
      await api.post("/auth/request-otp", { name, email, dob });
      setOtpRequested(true);
      setInfo("OTP sent to your email.");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!otp) return setError("Enter the OTP sent to your email.");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { name, email, dob, otp });
      const token = res.data.token;
      await loginWithToken(token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Left side */}
        <div className="p-4 flex flex-col">
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="w-30 h-30">
              <img src="/assets/logo.png" alt="logo" className="w-full" />
            </div>
          </div>

          <div className="p-2 md:p-8">
            {/* Heading */}
            <h1 className="text-2xl font-semibold mb-1 mt-4 md:mt-10 text-center md:text-left">Sign up</h1>
            <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
              Sign up to enjoy the feature of HD
            </p>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-6">
              {/* Name */}
              <div className="relative">
                <fieldset className="border border-gray-300 rounded-md px-3 pt-2">
                  <legend className="text-xs text-gray-500 px-1">Your Name</legend>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-none focus:ring-0 outline-none text-sm py-1"
                    placeholder="Jonas Khanwald"
                  />
                </fieldset>
              </div>

              {/* DOB */}
              <div className="relative">
                <fieldset className="border border-gray-300 rounded-md px-3 pt-2">
                  <legend className="text-xs text-gray-500 px-1">Date of Birth</legend>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full border-none focus:ring-0 outline-none text-sm py-1"
                  />
                </fieldset>
              </div>

              {/* Email */}
              <div className="relative">
                <fieldset className="border border-gray-300 rounded-md px-3 pt-2">
                  <legend className="text-xs text-gray-500 px-1">Email</legend>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-none focus:ring-0 outline-none text-sm py-1"
                    placeholder="jonas_kahnwald@gmail.com"
                  />
                </fieldset>
              </div>

              {/* OTP */}
              {otpRequested && (
                <div>
                  <input
                    ref={otpRef}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="OTP"
                  />
                </div>
              )}

              {/* Messages */}
              {error && <div className="text-sm text-red-600">{error}</div>}
              {info && !error && <div className="text-sm text-blue-600">{info}</div>}

              {/* Actions */}
              {!otpRequested ? (
                <button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  {loading ? "Sending..." : "Get OTP"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
                >
                  {loading ? "Verifying..." : "Sign up"}
                </button>
              )}

              {/* OR Divider */}
              <div className="flex items-center gap-2 my-2">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="text-xs text-gray-400">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              {/* Google Signup Button */}
              <div id="googleSignupBtn" className="flex justify-center"></div>

              {/* Sign in link */}
              <div className="text-xs text-gray-500 text-center">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right illustration */}
        <div className="hidden md:flex items-center justify-center bg-white">
          <img
            src="/assets/auth-illustration.png"
            alt="Illustration"
            className="object-cover w-full h-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
