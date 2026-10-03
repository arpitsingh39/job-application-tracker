function ApplicationCard({ application, onEdit, onDelete }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Interview":
        return "bg-yellow-100 text-yellow-700";

      case "Selected":
        return "bg-green-100 text-green-700";

      case "Rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const formattedDate = new Date(
    application.applicationDate
  ).toLocaleDateString();

  return (
    <div className="bg-white border rounded-xl p-5">

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-900">
              {application.companyName}
            </h3>

            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStatusClass(
                application.status
              )}`}
            >
              {application.status}
            </span>
          </div>

          <p className="text-gray-700 mt-1">
            {application.jobPosition}
          </p>

          {application.location && (
            <p className="text-sm text-gray-500 mt-1">
              {application.location}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(application)}
            className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(application._id)}
            className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
          >
            Delete
          </button>
        </div>

      </div>

      <div className="mt-4 pt-4 border-t text-sm text-gray-500 space-y-1">

        <p>
          Applied: {formattedDate}
        </p>

        {application.jobUrl && (
          <p>
            <a
              href={application.jobUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Job
            </a>
          </p>
        )}

        {application.notes && (
          <p className="text-gray-600">
            {application.notes}
          </p>
        )}

      </div>

    </div>
  );
}

export default ApplicationCard;