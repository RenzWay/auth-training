import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function LoginPage() {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <form className="flex flex-col gap-10 w-full max-w-md" action="">
        <header>
          <h1>Login</h1>
        </header>

        <div className="flex flex-col gap-5">
          <TextField
            variant="standard"
            label="Email"
            placeholder="Email"
          ></TextField>
          <TextField
            variant="standard"
            label="Password"
            placeholder="Password"
            type="password"
          ></TextField>
        </div>

        <div>
          <Button variant="contained" color="success" fullWidth>
            Login
          </Button>
        </div>
      </form>
    </section>
  );
}
