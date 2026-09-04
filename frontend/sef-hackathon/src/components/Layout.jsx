import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, PackageCheck, Plus, X } from 'lucide-react'

const NavItems = ({ close }) => (
  <>
    <NavLink to="/" end className="nav-link" onClick={close}>Home</NavLink>
    <NavLink to="/items" className="nav-link" onClick={close}>Browse items</NavLink>
    <Link to="/#how-it-works" className="nav-link" onClick={close}>How it works</Link>
  </>
)

export default function Layout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Campus Link home">
            <span className="brand-mark"><PackageCheck size={21} /></span> Campus Link
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation"><NavItems /></nav>
          <Link to="/report" className="btn btn-primary header-cta"><Plus size={17} /> Report an item</Link>
          <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <nav className={`mobile-menu ${open ? 'open' : ''}`} aria-label="Mobile navigation"><NavItems close={() => setOpen(false)} /></nav>
      <main className="main-content"><Outlet /></main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div><Link to="/" className="brand footer-brand"><span className="brand-mark"><PackageCheck size={21}/></span> Campus Link</Link><p className="footer-copy">A simple community noticeboard helping Sri Lankan university students and staff reconnect lost belongings with their owners.</p></div>
            <div className="footer-col"><h3>Explore</h3><Link to="/items">Browse reports</Link><Link to="/report">Report an item</Link></div>
            <div className="footer-col"><h3>Community</h3><Link to="/items?type=Lost">Lost items</Link><Link to="/items?type=Found">Found items</Link></div>
          </div>
          <div className="footer-bottom">© 2026 Campus Link · Built for Sri Lankan university communities</div>
        </div>
      </footer>
    </div>
  )
}
