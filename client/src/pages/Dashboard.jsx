import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationCard from "../components/ApplicationCard";

import { apiRequest } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch applications
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/applications");

      setApplications(data.applications);
    } catch (error) {
      if (
        error.message === "Invalid or expired token" ||
        error.message === "Not authorized"
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    fetchApplications();
  }, []);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: applications.length,
      applied: applications.filter(
        (app) => app.status === "Applied"
      ).length,
      interview: applications.filter(
        (app) => app.status === "Interview"
      ).length,
      selected: applications.filter(
        (app) => app.status === "Selected"
      ).length,
      rejected: applications.filter(
        (app) => app.status === "Rejected"
      ).length,
    };
  }, [applications]);

  // Search + filter
  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.companyName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        application.jobPosition
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  // Add / Edit
  const handleSubmit = async (formData) => {
    try {
      setError("");

      if (editingApplication) {
        const data = await apiRequest(
          `/applications/${editingApplication._id}`,
          {
            method: "PUT",
            body: JSON.stringify(formData),
          }
        );

        setApplications((current) =>
          current.map((app) =>
            app._id === editingApplication._id
              ? data.application
              : app
          )
        );
      } else {
        const data = await apiRequest("/applications", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        setApplications((current) => [
          data.application,
          ...current,
        ]);
      }

      setShowForm(false);
      setEditingApplication(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await apiRequest(`/applications/${id}`, {
        method: "DELETE",
      });

      setApplications((current) =>
        current.filter((app) => app._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (application) => {
    setEditingApplication(application);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingApplication(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Keep track of your job applications.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingApplication(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700"
          >
            + Add Application
          </button>

        </div>

        {/* Statistics */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

          <StatsCard
            title="Total"
            count={stats.total}
          />

          <StatsCard
            title="Applied"
            count={stats.applied}
          />

          <StatsCard
            title="Interview"
            count={stats.interview}
          />

          <StatsCard
            title="Selected"
            count={stats.selected}
          />

          <StatsCard
            title="Rejected"
            count={stats.rejected}
          />

        </div>

        {/* Form */}

        {showForm && (
          <div className="mb-8">
            <ApplicationForm
              application={editingApplication}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Search */}

        <div className="bg-white border rounded-xl p-4 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company or position..."
              className="md:col-span-2 border rounded-lg px-4 py-2"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

        </div>

        {/* Applications */}

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading applications...
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white border rounded-xl text-center py-12 px-4">
            <h3 className="text-lg font-semibold text-gray-900">
              No applications found
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first job application to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application._id}
                application={application}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </main>

    </div>
  );
}

export default Dashboard;