import { useState } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Eye,
  HelpCircle,
  Laptop,
  Lock,
  MapPin,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('lost') // 'lost' | 'found'
  const [activeStep, setActiveStep] = useState(0)
  const [checkedSafety, setCheckedSafety] = useState([0, 1]) // initial checked indices
  const [selectedHotspot, setSelectedHotspot] = useState(0)
  const [faqCategory, setFaqCategory] = useState('all')
  const [openFaqIndex, setOpenFaqIndex] = useState(0)

  const lostSteps = [
    {
      num: '01',
      title: 'Search the Campus Database',
      short: 'Check if already reported',
      icon: Search,
      description:
        'Before creating a new report, search Campus Link for your lost belonging. Many honest campus members report items within minutes of finding them.',
      tip: 'Try searching by building name (e.g. "Main Library"), brand, or broad item category like "calculator" or "umbrella".',
      preview: {
        title: 'Search in action',
        items: [
          'Filter by "Found" status',
          'Specify exact faculty or floor location',
          'Sort by newest notices',
        ],
      },
    },
    {
      num: '02',
      title: 'Submit a Clear "Lost" Notice',
      short: 'Publish details',
      icon: ClipboardList,
      description:
        'If your item has not been reported, create a Lost report. Detail distinct visual characteristics (color, marks, stickers), the approximate time, and where you last had it.',
      tip: 'Do not post sensitive credentials or passwords. Keep contact info safe such as your student email or campus phone.',
      preview: {
        title: 'Report essentials',
        items: [
          'Item name & distinctive traits',
          'Last known faculty / lecture hall location',
          'Date lost & student contact method',
        ],
      },
    },
    {
      num: '03',
      title: 'Verify Ownership Safely',
      short: 'Prove it is yours',
      icon: ShieldCheck,
      description:
        'When someone reaches out having found an item, verify ownership with specifics that were omitted from public listings—like screen wallpapers, serial numbers, or internal contents.',
      tip: 'Arrange the handover at a well-lit, public campus spot like the Library circulation desk or Faculty Security office.',
      preview: {
        title: 'Safe verification checklist',
        items: [
          'Describe non-public identifying details',
          'Present your University Student ID',
          'Never pay money or delivery fees for returns',
        ],
      },
    },
    {
      num: '04',
      title: 'Recover & Mark Resolved',
      short: 'Close the report',
      icon: CheckCircle2,
      description:
        'Once you are reunited with your belonging, click "Mark as Resolved" on your report. This updates campus statistics and keeps the active noticeboard clutter-free!',
      tip: 'A quick thank-you note or acknowledging the finder at the faculty desk fosters great campus spirit.',
      preview: {
        title: 'Resolution impact',
        items: [
          'Notice status changes to "Resolved"',
          'Campus community success counter increases',
          'Search results stay clean and relevant',
        ],
      },
    },
  ]

  const foundSteps = [
    {
      num: '01',
      title: 'Safeguard the Found Item',
      short: 'Secure property',
      icon: Lock,
      description:
        'When you spot an unattended item in a lecture hall, lab, canteen, or library, ensure it is kept safe. If you cannot carry it, inform nearby security or lab instructors.',
      tip: 'For wallets, phones, and laptops, handing them directly to the nearest faculty security checkpoint is recommended.',
      preview: {
        title: 'Immediate action',
        items: [
          'Check if an ID card is attached with student details',
          'Keep electronics in a safe, dry spot',
          'Note down exact location and time discovered',
        ],
      },
    },
    {
      num: '02',
      title: 'Post a "Found" Notice',
      short: 'Alert campus',
      icon: Sparkles,
      description:
        'Publish a Found notice on Campus Link. State the location where you found it and provide a helpful description, but withhold at least one unique identifying feature.',
      tip: 'Withhold secret details (e.g. total cash amount, keychain charm, laptop sticker) so the real owner can verify their claim.',
      preview: {
        title: 'Listing recommendations',
        items: [
          'Take a clear photo of the general exterior',
          'List building & room number',
          'Do NOT show full credit card numbers or ID numbers',
        ],
      },
    },
    {
      num: '03',
      title: 'Confirm Genuine Claimants',
      short: 'Confirm claimant',
      icon: Eye,
      description:
        'When contacted by a claimant, ask them to verify the unique withheld details or unlock device screens before handing over the property.',
      tip: 'Ask: "What color is the pouch?", "What is the lock screen image?", or check their student ID against the item name.',
      preview: {
        title: 'Verification questions',
        items: [
          'Ask for device unlock or wallpaper confirmation',
          'Verify student ID name matches cards in wallet',
          'Check brand / model specific marks',
        ],
      },
    },
    {
      num: '04',
      title: 'Hand Over & Resolve',
      short: 'Reunite & close',
      icon: PackageCheck,
      description:
        'Meet at a designated campus hotspot or security desk to return the item. Then visit your report on Campus Link and mark it "Resolved".',
      tip: 'Marking the report resolved lets other searchers know the item is no longer misplaced.',
      preview: {
        title: 'Handover complete',
        items: [
          'Owner happily reunited with their belongings',
          'Zero risk of multiple duplicate claims',
          'One more successful campus return recorded!',
        ],
      },
    },
  ]

  const currentSteps = activeTab === 'lost' ? lostSteps : foundSteps
  const currentStepData = currentSteps[activeStep] || currentSteps[0]

  const safetyItems = [
    {
      title: 'Ask for non-public identifiers',
      desc: 'Verify details not shown in photos (stickers, lock screen wallpaper, specific cards inside wallet).',
    },
    {
      title: 'Meet only at public, daytime campus locations',
      desc: 'Use high-traffic areas such as the Main Library reception, Faculty Security post, or Student Cafeteria.',
    },
    {
      title: 'Confirm University Identity',
      desc: 'Request to see a valid University Student or Staff ID before handing over valuable property.',
    },
    {
      title: 'Never pay or request money transfers',
      desc: 'Campus Link is 100% community-driven and free. Never pay "finders fees" or online shipping deposits.',
    },
    {
      title: 'Escalate unclaimed high-value items to Security',
      desc: 'If an owner does not contact you within 48 hours for wallets or laptops, deposit them with University Security.',
    },
  ]

  const toggleSafetyCheck = (index) => {
    if (checkedSafety.includes(index)) {
      setCheckedSafety(checkedSafety.filter((i) => i !== index))
    } else {
      setCheckedSafety([...checkedSafety, index])
    }
  }

  const campusHotspots = [
    {
      name: 'Main Campus Library',
      location: 'Ground Floor, Circulation & Information Desk',
      bestFor: 'Books, student ID cards, stationary, notebooks, umbrellas',
      hours: '8:00 AM – 7:00 PM (Weekdays)',
      icon: BookOpen,
      badge: 'Highest recovery rate',
    },
    {
      name: 'Faculty Security Desks',
      location: 'Faculty Entrances (Computing, Engineering, Science, Arts)',
      bestFor: 'Wallets, smart phones, laptops, watches, keys',
      hours: '24/7 Monitored Post',
      icon: ShieldCheck,
      badge: 'Safest for valuables',
    },
    {
      name: 'Campus IT Centre Helpdesk',
      location: 'IT Building, 1st Floor Reception',
      bestFor: 'USB drives, chargers, power banks, headphones, calculators',
      hours: '8:30 AM – 5:00 PM',
      icon: Laptop,
      badge: 'Best for tech accessories',
    },
    {
      name: 'Student Welfare & Union Office',
      location: 'Student Centre, Ground Floor Room 102',
      bestFor: 'Bags, sports equipment, coats, lab coats, water bottles',
      hours: '9:00 AM – 4:30 PM',
      icon: Building2,
      badge: 'Central campus hub',
    },
  ]

  const faqs = [
    {
      category: 'general',
      q: 'Is Campus Link free to use for all students and staff?',
      a: 'Yes! Campus Link is entirely free for students, lecturers, and non-academic staff across Sri Lankan university campuses. There are no fees to post notices or browse listings.',
    },
    {
      category: 'reporting',
      q: 'Can I upload a photo with my lost or found report?',
      a: 'Yes! When reporting an item, you can provide an image URL. For found items, we recommend capturing the general item appearance without revealing confidential data (such as bank card numbers or serial codes).',
    },
    {
      category: 'safety',
      q: 'How can I prevent fraudulent claims for high-value items?',
      a: 'Always withhold one specific detail from your public description (e.g. color of keychain, lock screen photo, brand of headphones inside a bag). When someone contacts you, ask them to identify that missing detail before agreeing to meet.',
    },
    {
      category: 'reporting',
      q: 'What should I do once an item is reunited with its owner?',
      a: 'Navigate to your item report page and click the "Mark as Resolved" button. This updates the report status across the platform and ensures other searchers know the item has been recovered.',
    },
    {
      category: 'safety',
      q: 'What if an item is not claimed for several days?',
      a: 'If you have posted a found notice and no genuine owner reaches out within 3 to 5 days, hand the physical item over to the Campus Security Office or the Dean’s Office of the faculty where it was found.',
    },
    {
      category: 'general',
      q: 'Can I edit or delete my report if I made a typo?',
      a: 'Yes! From the item details page, click the "Edit report" or "Delete" button. You can update the location, description, or contact details at any time.',
    },
  ]

  const filteredFaqs =
    faqCategory === 'all'
      ? faqs
      : faqs.filter((item) => item.category === faqCategory)

  return (
    <div className="how-it-works-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container page-heading">
          <div>
            <div className="eyebrow">Interactive Platform Guide</div>
            <h1>How Campus Link Works</h1>
            <p>
              Learn how our university community reports, verifies, and safely
              reunites lost belongings across campus.
            </p>
          </div>
          <div className="hero-actions">
            <Link to="/report" className="btn btn-primary">
              <ClipboardList size={18} /> Report an item
            </Link>
            <Link to="/items" className="btn btn-secondary">
              <Search size={18} /> Browse listings
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Workflow Section */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Step-by-step walkthrough</div>
              <h2>Interactive Guided Flow</h2>
              <p>
                Select your situation below to explore the exact steps and best
                practices.
              </p>
            </div>

            {/* Role Switcher */}
            <div className="interactive-role-switcher" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'lost'}
                className={`role-tab ${activeTab === 'lost' ? 'active lost-mode' : ''}`}
                onClick={() => {
                  setActiveTab('lost')
                  setActiveStep(0)
                }}
              >
                <AlertCircle size={18} /> I Lost Something
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'found'}
                className={`role-tab ${activeTab === 'found' ? 'active found-mode' : ''}`}
                onClick={() => {
                  setActiveTab('found')
                  setActiveStep(0)
                }}
              >
                <CheckCircle2 size={18} /> I Found Something
              </button>
            </div>
          </div>

          {/* Stepper Progress Navigation */}
          <div className="stepper-nav">
            {currentSteps.map((step, idx) => {
              const StepIcon = step.icon
              const isCurrent = idx === activeStep
              const isPast = idx < activeStep
              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`stepper-pill ${isCurrent ? 'current' : ''} ${isPast ? 'completed' : ''}`}
                >
                  <span className="stepper-bubble">
                    {isPast ? <Check size={14} /> : step.num}
                  </span>
                  <div className="stepper-pill-text">
                    <strong>Step {step.num}</strong>
                    <small>{step.short}</small>
                  </div>
                  <StepIcon size={16} className="stepper-icon-dim" />
                </button>
              )
            })}
          </div>

          {/* Active Step Interactive Showcase Card */}
          <div className="step-display-card">
            <div className="step-display-header">
              <div className="step-header-left">
                <span className="step-badge">
                  Step {currentStepData.num} of 04 ·{' '}
                  {activeTab === 'lost' ? 'Lost Item Flow' : 'Found Item Flow'}
                </span>
                <h3>{currentStepData.title}</h3>
              </div>
              <div className="step-header-icon">
                {<currentStepData.icon size={28} />}
              </div>
            </div>

            <div className="step-display-body">
              <div className="step-display-narrative">
                <p className="step-main-desc">{currentStepData.description}</p>
                <div className="step-tip-box">
                  <Sparkles size={20} className="tip-sparkle" />
                  <div>
                    <strong>Pro tip for students:</strong>
                    <p>{currentStepData.tip}</p>
                  </div>
                </div>

                {/* Step navigation buttons */}
                <div className="step-nav-controls">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  >
                    <ArrowLeft size={16} /> Previous step
                  </button>
                  {activeStep < currentSteps.length - 1 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        setActiveStep((prev) =>
                          Math.min(currentSteps.length - 1, prev + 1)
                        )
                      }
                    >
                      Next: Step {currentSteps[activeStep + 1].num}{' '}
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <Link
                      to={activeTab === 'lost' ? '/items' : '/report'}
                      className="btn btn-primary"
                    >
                      {activeTab === 'lost'
                        ? 'Browse reports now'
                        : 'Report item now'}{' '}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Simulated Visual Interactive Card */}
              <div className="step-visual-panel">
                <div className="simulated-preview-box">
                  <div className="preview-top-bar">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="preview-title">
                      {currentStepData.preview.title}
                    </span>
                  </div>
                  <div className="preview-content">
                    <ul className="preview-checklist">
                      {currentStepData.preview.items.map((item, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={16} className="check-bullet" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="preview-status-tag">
                      <span className="status-ping"></span>
                      <span>
                        Actionable on Campus Link · Real-time noticeboard
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Safety & Verification Checklist */}
      <section className="section section-soft">
        <div className="container">
          <div className="safety-section-wrap">
            <div className="safety-intro">
              <div className="eyebrow">Safe Handover Protocol</div>
              <h2>Interactive Verification Checklist</h2>
              <p>
                Before exchanging items or meeting fellow campus members, check
                off each essential safeguard below to ensure a smooth, risk-free
                return.
              </p>

              {/* Dynamic Progress Indicator */}
              <div className="safety-score-card">
                <div className="safety-score-header">
                  <span>Checklist Progress</span>
                  <strong>
                    {checkedSafety.length} of {safetyItems.length} verified (
                    {Math.round(
                      (checkedSafety.length / safetyItems.length) * 100
                    )}
                    %)
                  </strong>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${(checkedSafety.length / safetyItems.length) * 100}%`,
                    }}
                  ></div>
                </div>
                {checkedSafety.length === safetyItems.length ? (
                  <div className="safety-pass-badge">
                    <CheckCircle2 size={18} />
                    <span>
                      Excellent! You are 100% prepared for a secure campus
                      handover.
                    </span>
                  </div>
                ) : (
                  <small className="progress-hint">
                    Click each item to check off requirements as you complete
                    them.
                  </small>
                )}
              </div>
            </div>

            {/* Checklist Items */}
            <div className="safety-items-list">
              {safetyItems.map((item, index) => {
                const isChecked = checkedSafety.includes(index)
                return (
                  <div
                    key={index}
                    className={`interactive-check-card ${isChecked ? 'checked' : ''}`}
                    onClick={() => toggleSafetyCheck(index)}
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault()
                        toggleSafetyCheck(index)
                      }
                    }}
                  >
                    <div className="check-box-square">
                      {isChecked && <Check size={16} />}
                    </div>
                    <div className="check-content">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                )
              })}
              <div className="checklist-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setCheckedSafety(safetyItems.map((_, i) => i))
                  }
                >
                  Check all
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCheckedSafety([])}
                >
                  Reset checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Hotspots & Designated Drop-off Points */}
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Campus Locations</div>
              <h2>Designated Handover Hotspots</h2>
              <p>
                Not sure where to meet or deposit an item? Campus Link recommends
                these official, staffed university facilities.
              </p>
            </div>
          </div>

          <div className="hotspots-grid">
            {campusHotspots.map((spot, idx) => {
              const HotspotIcon = spot.icon
              const isSelected = selectedHotspot === idx
              return (
                <div
                  key={spot.name}
                  className={`hotspot-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedHotspot(idx)}
                >
                  <div className="hotspot-card-top">
                    <span className="hotspot-icon-wrap">
                      <HotspotIcon size={22} />
                    </span>
                    <span className="hotspot-badge">{spot.badge}</span>
                  </div>
                  <h3>{spot.name}</h3>
                  <div className="hotspot-info">
                    <p className="hotspot-loc">
                      <MapPin size={16} /> {spot.location}
                    </p>
                    <p className="hotspot-hours">
                      <strong>Hours:</strong> {spot.hours}
                    </p>
                    <p className="hotspot-best">
                      <strong>Recommended items:</strong> {spot.bestFor}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Section */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Frequently Asked Questions</div>
              <h2>Got Questions? We Have Answers.</h2>
              <p>
                Find fast answers regarding notices, privacy, and safety
                guidelines.
              </p>
            </div>
          </div>

          {/* FAQ Category Filters */}
          <div className="faq-category-pills">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'general', label: 'General' },
              { id: 'reporting', label: 'Reporting & Edits' },
              { id: 'safety', label: 'Safety & Verification' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-pill ${faqCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setFaqCategory(cat.id)
                  setOpenFaqIndex(0)
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="faq-accordion">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={faq.q}
                  className={`faq-item ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-q-text">
                      <HelpCircle size={18} className="faq-icon" /> {faq.q}
                    </span>
                    <span className="faq-chevron">
                      {isOpen ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <ShieldCheck size={36} color="var(--green)" />
          <h2 style={{ fontSize: 32, margin: '15px 0 10px' }}>
            Ready to Help Your Campus Community?
          </h2>
          <p
            style={{
              color: 'var(--muted)',
              margin: '0 auto 26px',
              maxWidth: 580,
              lineHeight: 1.6,
            }}
          >
            Whether you misplaced your belongings or discovered someone else's,
            publishing a quick report connects you instantly with students and
            staff.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link className="btn btn-primary" to="/report">
              <ClipboardList size={18} /> Report an item now
            </Link>
            <Link className="btn btn-secondary" to="/items">
              <Search size={18} /> Browse active reports
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
