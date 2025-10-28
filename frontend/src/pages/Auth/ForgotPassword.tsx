import { useState } from "react";
import axios from "../../utils/api";
import { getApiErrorMessage } from "../../utils/handleApiError";

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setErr("");

    try {
      const res = await axios.post<ForgotPasswordResponse>("/auth/forgot-password", { email });
      setMsg(res.data.message || "Password reset instructions sent to your email");
    } catch (error) {
      setErr(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-yellow-50 to-green-100">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-2xl p-10 border border-green-100">
        {/* Header */}
        <div className="mb-6 flex flex-col items-center">
          <img
            src="/finallogo.jpg"
            alt="Logo"
            className="h-20 w-20 mb-3 rounded-full shadow-md bg-white/90 border-4 border-white"
          />
          <h1 className="text-3xl font-extrabold text-green-800 mb-1">
            Forgot Password
          </h1>
          <p className="text-green-900 mb-2 text-center font-medium">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block px-4 py-3 w-full rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />

          {/* ✅ Status Messages */}
          {msg && <div className="text-green-600 text-center font-medium">{msg}</div>}
          {err && <div className="text-red-500 text-center font-medium">{err}</div>}

          {/* ✅ Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-3 text-lg font-semibold rounded-lg shadow-lg transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 via-orange-400 to-green-500 hover:from-orange-400 hover:to-green-600 text-white"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
        </form>

        {/* ✅ Optional Footer */}
        <div className="text-center mt-4 text-sm">
          <a href="/" className="text-green-700 hover:underline font-medium">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
