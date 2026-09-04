import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, ClipboardPlus, PackageCheck, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/campus-return-banner.png'
import ItemCard from '../components/ItemCard'
import Loading from '../components/Loading'
import { getItems } from '../services/itemService'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { getItems().then(setItems).catch(() => setError('Reports could not be loaded right now.')).finally(() => setLoading(false)) }, [])
  const stats = [
    { label: 'Lost reports', value: items.filter((item) => item.type === 'Lost').length, icon: ClipboardPlus },
    { label: 'Found reports', value: items.filter((item) => item.type === 'Found').length, icon: Search },
    { label: 'Items reunited', value: items.filter((item) => item.isResolved).length, icon: CheckCircle2 },
  ]
  return <>
    <section className="hero-section"><div className="container hero-grid">
      <div className="hero-copy"><div className="eyebrow">Sri Lanka's campus lost &amp; found</div><h1>Lost something?<br/><em>Let’s find it together.</em></h1><p>Campus Link brings scattered notices into one trusted place, helping students and staff report, discover, and return belongings across campus.</p><div className="hero-actions"><Link className="btn btn-primary" to="/report"><ClipboardPlus size={18}/> Report an item</Link><Link className="btn btn-secondary" to="/items"><Search size={18}/> Browse reports</Link></div></div>
      <div className="hero-visual"><img src={heroImage} alt="Sri Lankan university students returning a lost backpack"/><div className="hero-note"><span><CheckCircle2 size={18}/></span> Community powered returns</div></div>
    </div></section>
    <section className="stats-bar" aria-label="Report statistics"><div className="container stats-grid">{stats.map(({label,value,icon:Icon})=><div className="stat" key={label}><span className="stat-icon"><Icon size={21}/></span><div><strong>{loading ? '—' : value}</strong><small>{label}</small></div></div>)}</div></section>
    <section className="section"><div className="container"><div className="section-heading"><div><div className="eyebrow">Latest notices</div><h2>Recent reports</h2><p>See what the campus community has reported most recently.</p></div><Link className="text-link" to="/items">View all reports <ArrowRight size={16}/></Link></div>{loading ? <Loading/> : error ? <div className="status-message error-message">{error}</div> : <div className="card-grid">{items.slice(0,3).map(item=><ItemCard key={item.id} item={item}/>)}</div>}</div></section>
    <section className="section section-soft" id="how-it-works"><div className="container how-grid"><div className="how-copy"><div className="eyebrow">Simple and helpful</div><h2>One place. Three easy steps.</h2><p>Whether you have misplaced something or picked up an item, sharing the right details can help it get home quickly.</p><div className="steps"><div className="step"><span className="step-num">01</span><div><h3>Create a clear report</h3><p>Tell the community what happened, where, and when.</p></div></div><div className="step"><span className="step-num">02</span><div><h3>Search campus notices</h3><p>Filter recent lost and found reports in seconds.</p></div></div><div className="step"><span className="step-num">03</span><div><h3>Reconnect safely</h3><p>Use the shared contact details and mark the report resolved.</p></div></div></div><div style={{marginTop:24}}><Link to="/how-it-works" className="text-link">Explore the full interactive guide &amp; safety checklist <ArrowRight size={16}/></Link></div></div><div className="impact-card"><div className="impact-icon"><PackageCheck size={40}/></div><h3>A better noticeboard for every campus</h3><p>Informal chats and paper notices are easy to miss. Campus Link keeps reports searchable and current, so Sri Lankan campus communities can help each other more effectively.</p></div></div></section>
    <section className="section"><div className="container" style={{textAlign:'center'}}><ShieldCheck size={30} color="var(--green)"/><h2 style={{fontSize:32,margin:'15px 0 10px'}}>Every report makes campus more connected.</h2><p style={{color:'var(--muted)',margin:'0 auto 24px',maxWidth:560,lineHeight:1.6}}>Found something that is not yours? A short report could save someone hours of worry.</p><Link className="btn btn-primary" to="/report">Create a report <ArrowRight size={17}/></Link></div></section>
  </>
}
