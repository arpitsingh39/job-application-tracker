import { useEffect, useState } from "react";

const initialForm = {
  companyName: "",
  jobPosition: "",
  location: "",
  status: "Applied",
  applicationDate: "",
  jobUrl: "",
  notes: "",
};

function ApplicationForm({ application, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (application) {
      setForm({
        companyName: application.companyName || "",
        jobPosition: application.jobPosition || "",
        location: application.location || "",
        status: application.status || "Applied",
        applicationDate: application.applicationDate
          ? application.applicationDate.split("T")[0]
          : "",
        jobUrl: application.jobUrl || "",
        notes: application.notes || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [application]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold">
          {application ? "Edit Application" : "Add Application"}
        </h2>

        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name *
            </label>
            <input
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Google"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Job Position *
            </label>
            <input
              name="jobPosition"
              value={form.jobPosition}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Frontend Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Mumbai"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white"
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Application Date *
            </label>

            <input
              type="date"
              name="applicationDate"
              value={form.applicationDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Job URL
            </label>

            <input
              type="url"
              name="jobUrl"
              value={form.jobUrl}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="https://..."
            />
          </div>

        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Notes
          </label>

          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Interview details, recruiter contact, etc."
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {application ? "Update Application" : "Add Application"}
          </button>
        </div>

      </form>
    </div>
  );
}

export default ApplicationForm;