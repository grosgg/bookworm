import { getTranslations } from 'next-intl/server';

export default async function StatusPill({ status }: { status: 'reading' | 'read' | 'not_read' }) {
  const t = await getTranslations('ui.statusPill');
  const statusLabels = {
    reading: t('reading'),
    read: t('read'),
    not_read: t('notRead'),
  };
  const statusColors = {
    reading: 'bg-yellow-100',
    read: 'bg-gray-400 text-white',
    not_read: 'bg-gray-400 text-white',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  );
}