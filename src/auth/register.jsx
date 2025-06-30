import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <form
        className="flex flex-col justify-center w-full max-w-md gap-8 bg-white/90 p-10 rounded-2xl shadow-2xl border border-blue-200 transition-all"
        action=""
      >
        <header className="flex flex-col items-center mb-2">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-1">
            Register
          </h1>
          <p className="text-gray-500 text-sm">
            Buat akun baru untuk mulai berpetualang!
          </p>
        </header>
        <div className="flex flex-col gap-6">
          <TextField
            variant="standard"
            placeholder="Jhon su"
            label={<span className="font-semibold text-blue-700">Nama</span>}
            className=" rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-300"
            fullWidth
          />

          <TextField
            variant="standard"
            placeholder="example@mail.com"
            label={<span className="font-semibold text-blue-700">Email</span>}
            className=" rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-300"
            fullWidth
          />

          <TextField
            variant="standard"
            placeholder="********"
            label={
              <span className="font-semibold text-blue-700">Password</span>
            }
            type={showPassword ? "text" : "password"}
            InputProps={{
              className:
                " rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-300",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </div>
        <div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-sky-400 text-white font-bold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-sky-500 transition-all text-lg"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </div>
        <p className="text-center text-gray-400 text-xs mt-2">
          Sudah punya akun? <Link to={"/login"}>Login</Link>
        </p>
      </form>
    </section>
  );
}
