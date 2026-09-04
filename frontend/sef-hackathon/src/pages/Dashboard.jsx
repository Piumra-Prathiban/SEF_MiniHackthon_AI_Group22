import { useEffect, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardPlus,
  Clock,
  Compass,
  FileText,
  Footprints,
  MessageSquare,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/campus-return-banner.png'
import ItemCard from '../components/ItemCard'
import Loading from '../components/Loading'
import { getItems } from '../services/itemService'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('problem') // 'problem' | 'solution'
  const [perspectiveTab, setPerspectiveTab] = useState('loser') // 'loser' | 'finder' | 'staff'

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch(() => setError('Reports could not be loaded right now.'))
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    {
      label: 'Lost reports',
      value: items.filter((item) => item.type === 'Lost').length,
      icon: ClipboardPlus,
    },
    {
      label: 'Found reports',
      value: items.filter((item) => item.type === 'Found').length,
      icon: Search,
    },
    {
      label: 'Items reunited',
      value: items.filter((item) => item.isResolved).length,
      icon: CheckCircle2,
    },
  ]

  const perspectives = {
    loser: {
      title: 'If You Misplaced an Item',
      desc: 'Stop worrying and scouring noisy WhatsApp group threads. Campus Link helps you discover if your belonging was already spotted in seconds.',
      points: [
        'Instant search across all faculties, lecture halls, and canteens.',
        'View photo and precise location before taking a long trek across campus.',
        'Direct, safe contact details to coordinate a quick campus handover.',
      ],
      badgeTitle: 'Save Hours of Panic',
      badgeDesc: 'No more waiting for someone to reply in batch groups.',
      icon: Search,
    },
    finder: {
      title: 'If You Found an Item',
      desc: 'You did a great deed by picking it up—now let Campus Link connect you with the genuine owner without spamming 500 people.',
      points: [
        'Post a report in under 60 seconds with location and photo.',
        'Withhold specific private identifiers to verify genuine claimants.',
        'Mark resolved once returned to keep the community board tidy.',
      ],
      badgeTitle: 'Hero of the Day',
      badgeDesc: 'Help a fellow student retrieve their irreplaceable notes or ID.',
      icon: Sparkles,
    },
    staff: {
      title: 'For Security & Faculty Desks',
      desc: 'Centralize unclaimed items piled up at department receptions, library circulation counters, and main security gates.',
      points: [
        'Organized digital log replacing dusty paper exercise books.',
        'Easily filter open vs resolved items for university inventory.',
        'Encourages safe, verified handovers at monitored campus hotspots.',
      ],
      badgeTitle: 'Campus Organization',
      badgeDesc: 'Streamline campus operations with transparency.',
      icon: Building2,
    },
  }

  const currentPerspective = perspectives[perspectiveTab]

  return (
    <>
      {/* Hero Section with 5 Moving Animated Blobs */}
      <section className="hero-section hero-relative">
        {/* 5 Organic Animated Floating Blobs */}
        <div className="blobs-container" aria-hidden="true">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
          <div className="blob blob-3"></div>
          <div className="blob blob-4"></div>
          <div className="blob blob-5"></div>
        </div>

        <div className="container hero-grid" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-copy">
            <div className="eyebrow">Sri Lanka's campus lost &amp; found</div>
            <h1>
              Lost something?
              <br />
              <em>Let’s find it together.</em>
            </h1>
            <p>
              Every semester, students lose personal belongings in lecture
              halls, canteens, and campus shuttles. Campus Link replaces
              informal WhatsApp chaos with a single, searchable noticeboard for
              all Sri Lankan university students and staff.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/report">
                <ClipboardPlus size={18} /> Report an item
              </Link>
              <Link className="btn btn-secondary" to="/items">
                <Search size={18} /> Browse reports
              </Link>
              <Link className="btn btn-secondary" to="/how-it-works">
                <Compass size={18} /> How it works
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src={heroImage}
              alt="Sri Lankan university students returning a lost backpack"
            />
            <div className="hero-note">
              <span>
                <CheckCircle2 size={18} />
              </span>{' '}
              Community powered campus returns
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Stats Bar */}
      <section className="stats-bar" aria-label="Report statistics">
        <div className="container stats-grid">
          {stats.map(({ label, value, icon: Icon }) => (
            <div className="stat" key={label}>
              <span className="stat-icon">
                <Icon size={21} />
              </span>
              <div>
                <strong>{loading ? '—' : value}</strong>
                <small>{label}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Problem vs Why You Should Use Us (Interactive Showcase) */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">The Campus Reality &amp; Our Mission</div>
              <h2>Why Traditional Channels Fail &amp; Why Use Us</h2>
              <p>
                Compare the everyday struggles of campus lost &amp; found with
                the structured power of Campus Link.
              </p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="problem-solution-switcher" role="tablist">
              <button
                type="button"
                className={`tab-switch-btn ${activeTab === 'problem' ? 'active problem-tab' : ''}`}
                onClick={() => setActiveTab('problem')}
              >
                <AlertCircle size={17} /> 1. The Campus Problem
              </button>
              <button
                type="button"
                className={`tab-switch-btn ${activeTab === 'solution' ? 'active solution-tab' : ''}`}
                onClick={() => setActiveTab('solution')}
              >
                <Zap size={17} /> 2. Our Proposed Solution
              </button>
            </div>
          </div>

          {/* Tab 1: The Problem */}
          {activeTab === 'problem' && (
            <div className="problem-banner-card">
              <div className="problem-header">
                <div className="problem-header-icon">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <span className="channel-badge">Everyday Dilemma</span>
                  <h3>The Problem — Lost &amp; Found on Sri Lankan Campuses</h3>
                </div>
              </div>
              <p className="problem-lead">
                Every semester, students across Sri Lankan university campuses
                misplace essential personal belongings—student ID cards, phones,
                wallets, umbrellas, water bottles, textbooks, and AirPods—in
                lecture halls, canteens, libraries, and shuttle buses. Today, the
                only recovery channels are informal, scattered, and broken.
              </p>

              {/* 3 Broken Channels Grid */}
              <div className="broken-channels-grid">
                <div className="channel-card">
                  <span className="channel-badge">
                    <MessageSquare size={13} /> Batch WhatsApp Groups
                  </span>
                  <h4>Lost in the Chat History</h4>
                  <p>
                    A photo is posted to a batch chat, but gets drowned under
                    500+ unread messages within hours. None of these chats are
                    searchable, and notices disappear from view after just a couple
                    of days.
                  </p>
                </div>

                <div className="channel-card">
                  <span className="channel-badge">
                    <FileText size={13} /> Paper Noticeboards
                  </span>
                  <h4>Fragile &amp; Unindexed</h4>
                  <p>
                    Handwritten slips pinned outside the student affairs office or
                    canteen noticeboard quickly tear, get rained on, or get covered
                    by posters. No one knows if an item has already been taken.
                  </p>
                </div>

                <div className="channel-card">
                  <span className="channel-badge">
                    <Footprints size={13} /> Word of Mouth &amp; Treks
                  </span>
                  <h4>Exhausting Blind Campus Walks</h4>
                  <p>
                    Students have no way to verify whether a spotted item
                    matches theirs before making an exhausting walk across
                    multiple faculties in the heat, often only to find it wasn't
                    theirs.
                  </p>
                </div>
              </div>

              {/* Summary Callout */}
              <div className="problem-impact-callout">
                <Clock size={24} color="var(--lost)" style={{ flexShrink: 0 }} />
                <div>
                  <strong>A low-stakes but high-frequency crisis:</strong> It
                  affects almost every student at some point during the
                  semester, wastes precious time for both the person who lost an
                  item and the person who found it, and results in hundreds of
                  recoverable items never being reunited.
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Why You Should Use Us / The Solution */}
          {activeTab === 'solution' && (
            <div className="solution-banner-card">
              <div className="solution-header">
                <div className="solution-header-icon">
                  <Zap size={24} />
                </div>
                <div>
                  <span
                    className="channel-badge"
                    style={{ background: '#e0f5ea', color: 'var(--found)' }}
                  >
                    Engineered for Universities
                  </span>
                  <h3>Our Solution — Why You Should Use Campus Link</h3>
                </div>
              </div>
              <p className="solution-lead">
                Campus Link is a full-stack web application that gives a
                university campus a single, structured place to report, search
                for, and resolve lost and found items. We replace guesswork and
                endless scrolling with an instant, trustworthy digital community
                noticeboard.
              </p>

              {/* 4 Pillars of the Solution */}
              <div className="solution-pillars-grid">
                <div className="pillar-card">
                  <div className="pillar-icon">
                    <Search size={20} />
                  </div>
                  <h4>Instant Keyword Search</h4>
                  <p>
                    Instead of scrolling through chat logs, search directly by item
                    name, brand, or faculty building in milliseconds.
                  </p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon">
                    <ShieldCheck size={20} />
                  </div>
                  <h4>Verify Before Travelling</h4>
                  <p>
                    Check location details, dates, and photo previews to confirm
                    ownership before taking the trip across campus.
                  </p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon">
                    <CheckCircle2 size={20} />
                  </div>
                  <h4>Live Resolution State</h4>
                  <p>
                    Once reunited, reports are marked "Resolved". The noticeboard
                    stays clean and current, saving everyone time.
                  </p>
                </div>

                <div className="pillar-card">
                  <div className="pillar-icon">
                    <Users size={20} />
                  </div>
                  <h4>Campus-Wide Reach</h4>
                  <p>
                    Breaks down faculty silos so notices reach students and staff
                    across Computing, Engineering, Arts, and Medicine alike.
                  </p>
                </div>
              </div>

              {/* Solution Impact Callout */}
              <div className="solution-impact-callout">
                <PackageCheck
                  size={24}
                  color="var(--found)"
                  style={{ flexShrink: 0 }}
                />
                <div>
                  <strong>Built for Sri Lankan students and staff:</strong> No
                  app store installs, lightweight mobile web support, offline
                  resilience, and tailored for campus safety.
                </div>
              </div>
            </div>
          )}

          {/* Interactive Perspectives: Tailored value for each user */}
          <div className="perspective-container">
            <div className="section-heading" style={{ marginBottom: 16 }}>
              <div>
                <div className="eyebrow">Tailored for Everyone</div>
                <h3 style={{ fontSize: 24, margin: 0 }}>
                  How Campus Link Empowers You
                </h3>
              </div>
            </div>

            <div className="perspective-tabs" role="tablist">
              <button
                type="button"
                className={`perspective-btn ${perspectiveTab === 'loser' ? 'active' : ''}`}
                onClick={() => setPerspectiveTab('loser')}
              >
                <Search size={16} /> For Students Who Lost Belongings
              </button>
              <button
                type="button"
                className={`perspective-btn ${perspectiveTab === 'finder' ? 'active' : ''}`}
                onClick={() => setPerspectiveTab('finder')}
              >
                <Sparkles size={16} /> For Students Who Found Belongings
              </button>
              <button
                type="button"
                className={`perspective-btn ${perspectiveTab === 'staff' ? 'active' : ''}`}
                onClick={() => setPerspectiveTab('staff')}
              >
                <Building2 size={16} /> For Security &amp; Faculty Desks
              </button>
            </div>

            <div className="perspective-content-card">
              <div className="perspective-text">
                <h4>{currentPerspective.title}</h4>
                <p>{currentPerspective.desc}</p>
                <ul className="perspective-checklist">
                  {currentPerspective.points.map((pt, idx) => (
                    <li key={idx}>
                      <Check size={16} />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="perspective-visual-badge">
                <span>Key Advantage</span>
                <strong>{currentPerspective.badgeTitle}</strong>
                <small>{currentPerspective.badgeDesc}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reports Section */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Latest notices</div>
              <h2>Recent reports</h2>
              <p>See what the campus community has reported most recently.</p>
            </div>
            <Link className="text-link" to="/items">
              View all reports <ArrowRight size={16} />
            </Link>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="status-message error-message">{error}</div>
          ) : (
            <div className="card-grid">
              {items.slice(0, 3).map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3 Steps Overview with Link to Interactive How-it-works */}
      <section className="section" id="how-it-works">
        <div className="container how-grid">
          <div className="how-copy">
            <div className="eyebrow">Simple and helpful</div>
            <h2>One place. Three easy steps.</h2>
            <p>
              Whether you have misplaced something or picked up an item, sharing
              the right details can help it get home quickly.
            </p>
            <div className="steps">
              <div className="step">
                <span className="step-num">01</span>
                <div>
                  <h3>Create a clear report</h3>
                  <p>Tell the community what happened, where, and when.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-num">02</span>
                <div>
                  <h3>Search campus notices</h3>
                  <p>Filter recent lost and found reports in seconds.</p>
                </div>
              </div>
              <div className="step">
                <span className="step-num">03</span>
                <div>
                  <h3>Reconnect safely</h3>
                  <p>
                    Use the shared contact details and mark the report resolved.
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <Link to="/how-it-works" className="text-link">
                Explore the full interactive guide &amp; safety checklist{' '}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="impact-card">
            <div className="impact-icon">
              <PackageCheck size={40} />
            </div>
            <h3>A better noticeboard for every campus</h3>
            <p>
              Informal chats and paper notices are easy to miss. Campus Link
              keeps reports searchable and current, so Sri Lankan campus
              communities can help each other more effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <ShieldCheck size={34} color="var(--dark-orange)" />
          <h2 style={{ fontSize: 32, margin: '15px 0 10px' }}>
            Every report makes campus more connected.
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              margin: '0 auto 24px',
              maxWidth: 580,
              lineHeight: 1.6,
            }}
          >
            Found something that is not yours? A short 60-second report could
            save someone hours of stress and worry.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link className="btn btn-primary" to="/report">
              <ClipboardPlus size={18} /> Create a report
            </Link>
            <Link className="btn btn-secondary" to="/items">
              <Search size={18} /> Browse all reports
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
