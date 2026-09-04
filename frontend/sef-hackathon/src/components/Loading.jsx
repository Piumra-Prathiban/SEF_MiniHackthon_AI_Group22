export default function Loading({ label = 'Loading reports…' }) {
  return <div className="loading-state"><div className="spinner" />{label}</div>
}
