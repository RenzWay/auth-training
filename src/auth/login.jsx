import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { login } from "./authService";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const log = await login(email, password);
      if (!log) {
        setError("Login gagal: tidak ada respon dari server");
        console.error("Login gagal: tidak ada log");
      } else {
        const user = log.user;
        sessionStorage.setItem("uid", user.uid);
        window.location.href = "/";
      }
    } catch (er) {
      setError(er.message || "Terjadi kesalahan saat login");
      console.error("Gagal login:", er);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-full max-w-md bg-white p-10 rounded-xl shadow-md"
      >
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Masuk ke Akun Anda
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Silakan login untuk melanjutkan
          </p>
        </header>

        <div className="flex flex-col gap-6">
          <TextField
            variant="standard"
            label="Email"
            placeholder="contoh@email.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            variant="standard"
            label="Password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? "Memproses..." : "Login"}
        </Button>

        {error && (
          <div className="text-red-600 text-sm text-center mt-2">{error}</div>
        )}
      </form>
    </section>
  );
}
