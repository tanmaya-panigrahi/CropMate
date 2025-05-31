// src/pages/Profile.jsx  – avatar positioning tweaked
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString()
    : "Unknown";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="relative  rounded-xl shadow-md overflow-visible">
        <div className="h-32 bg-primary w-full rounded-t-lg"></div>

        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <img
            src={user.photoURL || "/default-avatar.jpg"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>

        <div className="pt-20 pb-8 px-6 bg-card rounded-b-lg text-center">
          <h2 className="text-2xl font-semibold text-primary">
            {user.displayName || "Unnamed User"}
          </h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm mt-1 text-gray-600">
            Signed in via{" "}
            {user.providerData?.[0]?.providerId === "google.com"
              ? "Google"
              : "Email/Password"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Member since: {joinedDate}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard/history")}
              className="py-2 px-6 rounded-lg bg-primary text-white hover:bg-secondary transition text-sm"
            >
              Diagnosis History
            </button>

            <button
              onClick={logout}
              className="py-2 px-6 rounded-lg border border-red-600 text-red-600 hover:bg-red-50 transition text-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
