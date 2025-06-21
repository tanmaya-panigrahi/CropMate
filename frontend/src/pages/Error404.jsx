// src/pages/Error404.jsx
import { Link } from "react-router-dom";

export default function Error404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#FFFDF5] p-6">
      <h1 className="text-5xl font-bold text-[#103713] mb-4">404</h1>
      <p className="text-xl text-[#628B35] mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-[#628B35] text-white rounded-lg hover:bg-green-800 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
