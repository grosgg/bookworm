export default function StatusPill({ status }: { status: 'reading' | 'read' | 'not_read' }) {
  const statusLabels = {
    reading: 'Reading',
    read: 'Read',
    not_read: 'Not Read',
  };
  const statusColors = {
    reading: 'bg-yellow-100',
    read: 'bg-gray-500 text-white',
    not_read: 'bg-gray-500 text-white',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  );
}