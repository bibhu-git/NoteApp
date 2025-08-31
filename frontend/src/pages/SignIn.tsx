/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

declare global {
  interface Window {
    google: any;
  }
}

export default function Login() {
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [otpRequested, setOtpRequested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { loginWithToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Initialize Google Login
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginBtn"),
        { theme: "outline", size: "large", width: "100%" }
      );
    }
  }, []);

  const handleGoogleResponse = async (response: any) => {
    try {
      const res = await api.post("/auth/google", { idToken: response.credential });
      await loginWithToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed", err);
      setError("Google login failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const requestOtp = async () => {
    setError(null);
    setLoading(true);
    try {
      await api.post("/auth/signin-request", { email: formData.email });
      setOtpRequested(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpRequested) return requestOtp();
    if (!formData.otp) return setError("Enter OTP");

    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-signin", {
        email: formData.email,
        otp: formData.otp,
      });
      await loginWithToken(res.data.token);
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
        
        {/* Form Section */}
        <div className="p-6 flex flex-col">
          <div className="mb-8 flex justify-center md:justify-start">
            <div className="w-30 h-30">
              <img src="/assets/logo.png" alt="logo" className="h-full" />
            </div>
          </div>

          <div className="p-2 md:p-8">
            {/* Heading */}
            <h1 className="text-2xl font-semibold mb-1 mt-4 md:mt-10 text-center md:text-left">
              Sign in
            </h1>
            <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
              Please login to continue to your account
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jonas_kahnwald@gmail.com"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              {/* OTP */}
              {otpRequested && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    placeholder="Enter OTP"
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <button
                    type="button"
                    onClick={requestOtp}
                    className="text-xs text-blue-600 hover:underline mt-1"
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {/* Keep me logged in */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Keep me logged in
                </label>
              </div>

              {/* Error */}
              {error && <div className="text-sm text-red-600">{error}</div>}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition"
              >
                {loading ? "Please wait..." : otpRequested ? "Sign in" : "Get OTP"}
              </button>

              {/* Google Sign-In */}
              <div id="googleLoginBtn" className="mt-3 flex justify-center"></div>

              {/* Redirect to signup */}
              <p className="text-xs text-gray-500 text-center">
                Need an account?{" "}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Panel */}
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
