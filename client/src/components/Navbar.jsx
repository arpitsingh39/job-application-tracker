import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">
            JobTrack
          </h1>
          <p className="text-xs text-gray-500">
            Job Application Tracker
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-gray-600">
            Hi, {user?.name || "User"}
          </span>

          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;