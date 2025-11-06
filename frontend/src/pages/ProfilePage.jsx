import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, logout } from "../services/api/AuthService";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        <p className="mt-4 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  const getInitial = (email) => email.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 w-full max-w-md p-8 rounded-2xl shadow-xl text-white">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-indigo-600 flex items-center justify-center text-4xl font-bold">
            {getInitial(user.email)}
          </div>
          <h2 className="text-2xl font-semibold">My Profile</h2>
        </div>

        <div className="space-y-4 text-gray-300">
          <div>
            <p className="text-sm text-gray-400">Email Address</p>
            <p className="text-lg font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Role</p>
            <p className="text-lg font-medium">{user.role || "User"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="text-lg font-medium">
              {new Date(user.date_joined).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-8 bg-red-600 hover:bg-red-700 py-2 rounded-md font-semibold transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
