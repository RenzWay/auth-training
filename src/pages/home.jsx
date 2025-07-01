import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  useEffect(() => {
    const uid = sessionStorage.getItem("uid");
    if (!uid) {
      if (location.pathname !== "/login") {
        location.href = "/register";
      }
      // Stop render React agar tidak flicker
      return;
    }
  }, []);
  return (
    <section>
      <h1>home</h1>
      <Link to={"/register"}> register</Link>
      <br />
      <Link to={"/post"}>post</Link>
    </section>
  );
}
