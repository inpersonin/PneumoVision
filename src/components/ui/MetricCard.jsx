import Card from './Card';

export default function MetricCard({ label, value, icon: Icon }) {
  const isMuted = value === '—' || value === '-';

  return (
    <Card className="p-6 text-center">
      <div className="w-10 h-10 rounded-full bg-surface-3 mx-auto flex items-center justify-center">
        {Icon && <Icon size={18} className="text-text-secondary" />}
      </div>
      <p className={`text-3xl font-bold mt-4 ${isMuted ? 'text-text-muted' : 'text-text-primary'}`}>
        {value}
      </p>
      <p className="text-sm text-text-secondary mt-2">{label}</p>
    </Card>
  );
}
