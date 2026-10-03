function StatsCard({ title, count }) {
  return (
    <div className="bg-white rounded-xl border p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="text-3xl font-bold text-gray-900 mt-2">
        {count}
      </p>
    </div>
  );
}

export default StatsCard;