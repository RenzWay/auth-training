import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section>
      <h1>home</h1>
      <Link to={"/register"}> register</Link>
    </section>
  );
}
