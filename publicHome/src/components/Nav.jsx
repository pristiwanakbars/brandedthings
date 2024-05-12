import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar sticky top-0 z-10 p-3 bg-gray-100 shadow mb-5">
      <div className="navbar-center">
        <Link to="/" className="text-2xl font-bold px-6">
          <span className="text-blue-500">Branded Things</span>
        </Link>
      </div>
    </nav>
  );
}
