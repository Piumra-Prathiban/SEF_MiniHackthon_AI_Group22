import { ArrowRight, CalendarDays, MapPin, PackageOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/format'

export default function ItemCard({ item }) {
  return (
    <article className="item-card">
      <div className={`card-visual ${item.type.toLowerCase()}`}>
        {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <PackageOpen className="placeholder" size={60} strokeWidth={1.4} />}
        <span className={`badge ${item.type.toLowerCase()}`}>{item.type}</span>
        {item.isResolved && <span className="badge resolved">Resolved</span>}
      </div>
      <div className="card-body">
        <h3>{item.name}</h3>
        <div className="meta"><span><MapPin size={14}/>{item.location}</span><span><CalendarDays size={14}/>{formatDate(item.date)}</span></div>
        <p className="card-description">{item.description}</p>
        <Link className="text-link" to={`/items/${item.id}`}>View details <ArrowRight size={15}/></Link>
      </div>
    </article>
  )
}
