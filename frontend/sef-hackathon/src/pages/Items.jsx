import { useEffect, useState } from 'react'
import { PackageSearch, Plus, Search, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import Loading from '../components/Loading'
import { getItems } from '../services/itemService'

export default function Items() {
  const [params, setParams] = useSearchParams()
  const [search, setSearch] = useState(params.get('search') || '')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const type = params.get('type') || ''
  const resolved = params.get('resolved') || ''
  useEffect(() => {
    const timer = setTimeout(() => {
      const next = new URLSearchParams(params)
      if (search.trim()) next.set('search', search.trim())
      else next.delete('search')
      if (next.toString() !== params.toString()) setParams(next, { replace: true })
    }, 350)
    return () => clearTimeout(timer)
  }, [search, params, setParams])
  useEffect(() => {
    getItems({ search: params.get('search') || '', type, resolved }).then(setItems).catch(() => setError('We could not load reports. Please check your connection and try again.')).finally(() => setLoading(false))
  }, [params, type, resolved])
  const update = (key, value) => { const next = new URLSearchParams(params); if (value) next.set(key,value); else next.delete(key); setParams(next) }
  const clear = () => { setSearch(''); setParams({}) }
  return <><section className="page-hero"><div className="container page-heading"><div><div className="eyebrow">Community noticeboard</div><h1>Browse reports</h1><p>Search and filter recent lost and found items from across campus.</p></div><Link className="btn btn-primary" to="/report"><Plus size={17}/> Report an item</Link></div></section><section className="items-page"><div className="container">
    <div className="filters"><div className="input-wrap"><Search size={18}/><input className="field-control" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search items, descriptions or locations…" aria-label="Search reports"/></div><select className="field-control" value={type} onChange={(e)=>update('type',e.target.value)} aria-label="Filter by report type"><option value="">All types</option><option>Lost</option><option>Found</option></select><select className="field-control" value={resolved} onChange={(e)=>update('resolved',e.target.value)} aria-label="Filter by status"><option value="">All statuses</option><option value="false">Open</option><option value="true">Resolved</option></select><button className="btn btn-secondary" onClick={clear}><X size={16}/> Clear</button></div>
    {!loading && !error && <div className="results-row"><span><strong>{items.length}</strong> {items.length===1?'report':'reports'} found</span><span>Newest first</span></div>}
    {loading ? <Loading/> : error ? <div className="status-message error-message">{error}</div> : items.length ? <div className="card-grid">{items.map(item=><ItemCard key={item.id} item={item}/>)}</div> : <div className="empty-state"><PackageSearch size={44}/><h3>No matching reports</h3><p>Try a broader search or clear the current filters.</p><button className="btn btn-secondary" onClick={clear}>Clear filters</button></div>}
  </div></section></>
}
