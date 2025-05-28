import { useAuth } from "@/context/AuthContext";

const Overview = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-semibold text-primary">
                Overview
            </h1>
            <h1 className="text-2xl font-semibold text-primary">
                Welcome, {user?.displayName || "Farmer"}!
            </h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Overview;
