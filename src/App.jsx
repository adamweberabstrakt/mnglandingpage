import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const LOCATIONS = [
  {
    name: 'CBD Kratom Chelsea',
    address: '354 W 14th St, New York, NY 10014',
    phone: '9172614294',
    phoneDisplay: '(917) 261-4294',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Chelsea',
    mapsPlaceId: 'ChIJs6TKgJRZwokR5EULmGQsIv0',
    reviewUrl: 'https://g.page/r/CeRFC5hkLCL9EAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/chelsea',
  },
  {
    name: 'CBD Kratom Lenox Hill',
    address: '794 Lexington Ave, New York, NY 10065',
    phone: '9174090552',
    phoneDisplay: '(917) 409-0552',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Lenox+Hill',
    mapsPlaceId: 'ChIJd4cpYM9ZwokRvz5QioX4qAY',
    reviewUrl: 'https://g.page/r/Cb8-UIqF-KgGEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/lenox-hill',
  },
  {
    name: 'CBD Kratom Flatiron District',
    address: '168 5th Ave, New York, NY 10010',
    phone: '6466660150',
    phoneDisplay: '(646) 666-0150',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Flatiron+District',
    mapsPlaceId: 'ChIJX01B45xZwokRl8NkZuN1G80',
    reviewUrl: 'https://g.page/r/CZfDZGbjdRvNEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/flatiron-ny',
  },
  {
    name: 'CBD Kratom Midtown – Times Square',
    address: '1420 Broadway, New York, NY 10018',
    phone: '6464541267',
    phoneDisplay: '(646) 454-1267',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Midtown+-+Times+Square',
    mapsPlaceId: 'ChIJ70grUF9ZwokRaSAGrmIPeSE',
    reviewUrl: 'https://g.page/r/CWkgBq5iD3khEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/times-square-midtown-new-york',
  },
  {
    name: 'CBD Kratom Upper West Side',
    address: '2039 B Broadway, New York, NY 10023',
    phone: '9174092598',
    phoneDisplay: '(917) 409-2598',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Upper+West+Side',
    mapsPlaceId: 'ChIJEYEpr99ZwokRvzidvdITXR4',
    reviewUrl: 'https://g.page/r/Cb84nb3SE10eEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/upper-west-side',
  },
  {
    name: 'CBD Kratom Financial District',
    address: '141 Fulton St, New York, NY 10038',
    phone: '6465901440',
    phoneDisplay: '(646) 590-1440',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Financial+District',
    mapsPlaceId: 'ChIJ3yuH_kpbwokRNIQHMm_uYbg',
    reviewUrl: 'https://g.page/r/CTSEBzJv7mG4EAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/financial-district',
  },
  {
    name: 'CBD Kratom SoHo',
    address: '161 6th Ave, New York, NY 10013',
    phone: '6465245790',
    phoneDisplay: '(646) 524-5790',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+SoHo',
    mapsPlaceId: 'ChIJfceh771ZwokRxpdR87FJNME',
    reviewUrl: 'https://g.page/r/CcaXUfOxSTTBEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/soho-new-york',
  },
  {
    name: 'CBD Kratom Upper East Side',
    address: '1562 3rd Ave, New York, NY 10128',
    phone: '6464788450',
    phoneDisplay: '(646) 478-8450',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Upper+East+Side',
    mapsPlaceId: 'ChIJv0HwJi1ZwokRe3cNmSiLG0U',
    reviewUrl: 'https://g.page/r/CXt3DZkoixtFEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/upper-east-side',
  },
  {
    name: 'CBD Kratom NoHo @ 0 Bond',
    address: '670 Broadway, New York, NY 10012',
    phone: '9298779552',
    phoneDisplay: '(929) 877-9552',
    hours: 'Open 9am – 9pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+NoHo+%40+0+Bond',
    mapsPlaceId: 'ChIJ2XDdmsdZwokRraoquNtu2_Q',
    reviewUrl: 'https://g.page/r/Ca2qKrjbbtv0EAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/noho-new-york',
  },
  {
    name: 'CBD Kratom Downtown Brooklyn',
    address: '55 Court St, Brooklyn, NY 11201',
    phone: '9295547770',
    phoneDisplay: '(929) 554-7770',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Downtown+Brooklyn',
    mapsPlaceId: 'ChIJSa0f0N1bwokRnUNPVDDHM7U',
    reviewUrl: 'https://g.page/r/CZ1DT1QwxzO1EAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/downtown-brooklyn-ny',
  },
  {
    name: 'CBD Kratom Williamsburg',
    address: '191 Bedford Ave, Brooklyn, NY 11211',
    phone: '3477213503',
    phoneDisplay: '(347) 721-3503',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Williamsburg',
    mapsPlaceId: 'ChIJnUjny7RZwokRg2Z-Kd48CYA',
    reviewUrl: 'https://g.page/r/CYNmfinePAmAEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/williamsburg',
  },
  {
    name: 'CBD Kratom Forest Hills',
    address: '70-09 Austin St, Forest Hills, NY 11375',
    phone: '3479607028',
    phoneDisplay: '(347) 960-7028',
    hours: 'Open 8am – 10pm · 7 days a week',
    delivery: 'Local Delivery 9am – 9pm',
    mapsQuery: 'CBD+Kratom+Forest+Hills',
    mapsPlaceId: 'ChIJQVwWf5tfwokR9tURhyqpjtc',
    reviewUrl: 'https://g.page/r/CfbVEYcqqY7XEAI/review',
    infoUrl: 'https://shopcbdkratom.com/pages/forest-hills',
  },
]

const FAQS = [
  {
    q: 'Where Can I Buy CBD and Kratom in NYC?',
    a: 'CBD Kratom has 12 retail stores across NYC — 9 in Manhattan, 2 in Brooklyn, and 1 in Queens. All locations are listed above with addresses, hours, and directions.',
  },
  {
    q: 'Is Kratom Legal in New York?',
    a: 'Yes. Kratom is legal in New York State, including all five boroughs. All products are 3rd-party lab tested for potency and purity.',
  },
  {
    q: 'Does CBD Kratom Offer Delivery in NYC?',
    a: 'Yes! Every NYC location offers local delivery 9am–9pm, 7 days a week. Plus free shipping on orders over $100 when you shop online.',
  },
  {
    q: "What Are CBD Kratom's Store Hours in NYC?",
    a: 'Most stores are open 8am to 10pm, 7 days a week. NoHo @ 0 Bond operates 9am to 9pm.',
  },
  {
    q: "Can I Visit If I'm New to CBD or Kratom?",
    a: 'Absolutely. Our NYC staff specializes in helping first-time shoppers navigate CBD, Kratom, Delta-8, Delta-9, and more. No question is too basic.',
  },
]

const BARCODE_URL = 'https://shopcbdkratom.com/cdn/shop/files/Barcode-1.png?v=1772826261'

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useReveal(threshold = 0.08) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const PrintIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 6 2 18 2 18 9"/>
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
    <rect x="6" y="14" width="12" height="8"/>
  </svg>
)

const MapPinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display:'inline',verticalAlign:'middle',marginRight:4,flexShrink:0}}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display:'inline',verticalAlign:'middle',marginRight:4,flexShrink:0}}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

const TruckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display:'inline',verticalAlign:'middle',marginRight:4,flexShrink:0}}>
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 3v5h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
)

// ─────────────────────────────────────────────
// ANNOUNCEMENT BAR
// ─────────────────────────────────────────────

function AnnouncementBar() {
  return (
    <div className="ann">
      <p className="ann-text">
        <strong>FREE SHIPPING</strong> on orders $100+
        &nbsp;·&nbsp; Exclusions Apply
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <a href="https://shopcbdkratom.com" target="_blank" rel="noopener noreferrer" className="nav-brand" aria-label="CBD Kratom Home">
        <img
          src="https://shopcbdkratom.com/cdn/shop/files/logo-white.png?v=1716393204&width=400"
          alt="CBD Kratom"
          className="nav-logo"
          loading="eager"
        />
      </a>
      <a href="https://shopcbdkratom.com/collections/all" target="_blank" rel="noopener noreferrer" className="nav-shop-link">
        Shop Online
      </a>
    </nav>
  )
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

function Hero() {
  const [ref, visible] = useReveal(0.01)

  return (
    <section className="hero" ref={ref}>
      {/* Hero image fills the background */}
      <div className="hero-img-wrap" aria-hidden="true">
        <img src="/hero.webp" alt="" className="hero-img" />
      </div>
      <div className="hero-overlay" aria-hidden="true" />

      <div className={`hero-content${visible ? ' is-visible' : ''}`}>
        <p className="hero-eyebrow">Exclusive In-Store Offer &nbsp;·&nbsp; New York City</p>

        <h1 className="hero-h1">New York, We Miss You.</h1>

        <p className="hero-body">
          We miss you. Come in and redeem your exclusive offer at any participating
          New York CBD Kratom location.
        </p>

        <div className="offer-pill">
          <div className="offer-pill-text">
            <p className="offer-pill-title">Dogg Lbs Laid-Back Lollipops: <strong>$15</strong></p>
            <p className="offer-pill-sub">Regularly $22. Save $7.</p>
          </div>
        </div>

        <p className="hero-fine">
          Valid in-store only at participating New York City CBD Kratom locations.
          Present barcode at checkout. One redemption per customer. Cannot be combined with other offers.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// BARCODE
// ─────────────────────────────────────────────

function BarcodeSection() {
  const [ref, visible] = useReveal(0.1)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    try {
      const response = await fetch(BARCODE_URL)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'CBDK-Exclusive-Barcode.png'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      window.open(BARCODE_URL, '_blank')
    }
  }

  const handlePrint = () => {
    const win = window.open('', '_blank')
    win.document.write(`
      <html>
        <head>
          <title>Your Exclusive Offer – CBD Kratom NYC</title>
          <style>
            body { margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; background: #fff; font-family: sans-serif; }
            img { max-width: 480px; width: 90%; margin-bottom: 16px; }
            p { text-align: center; font-size: 14px; color: #444; max-width: 380px; line-height: 1.5; }
          </style>
        </head>
        <body>
          <img src="${BARCODE_URL}" alt="Exclusive Barcode" />
          <p>Present at checkout at any participating NYC CBD Kratom location.<br/>One redemption per customer.</p>
          <script>window.onload = () => { window.print(); }<\/script>
        </body>
      </html>
    `)
    win.document.close()
  }

  return (
    <section className="bc-section">
      <div className={`bc-card${visible ? ' is-visible' : ''}`} ref={ref}>
        <span className="bc-badge">Your Exclusive Offer</span>

        <p className="bc-title">Show this barcode at checkout</p>

        <div className="bc-img-wrap">
          <img
            src={BARCODE_URL}
            alt="Exclusive discount barcode — present at checkout"
            className="bc-img"
            loading="lazy"
          />
        </div>

        <div className="bc-actions">
          <button className="bc-btn bc-btn--primary" onClick={handleSave}>
            {saved ? (
              <><span>✓</span>&nbsp; Saved!</>
            ) : (
              <><DownloadIcon />&nbsp; Save Barcode</>
            )}
          </button>
          <button className="bc-btn bc-btn--secondary" onClick={handlePrint}>
            <PrintIcon />&nbsp; Print
          </button>
        </div>

        <p className="bc-fine">Present this barcode at checkout at any participating NYC location</p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// LOCATIONS
// ─────────────────────────────────────────────

function LocationCard({ loc, index, visible }) {
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${loc.mapsQuery}&query_place_id=${loc.mapsPlaceId}`
  const mapsDir = `https://www.google.com/maps/dir/?api=1&destination=${loc.mapsQuery}&destination_place_id=${loc.mapsPlaceId}`

  return (
    <div
      className={`loc-card${visible ? ' is-visible' : ''}`}
      style={{ '--delay': `${Math.min(index, 8) * 0.055}s` }}
    >
      <div className="loc-status">
        <span className="loc-open-dot" aria-hidden="true" />
        <span className="loc-open-text">Open</span>
      </div>

      <h3 className="loc-name">{loc.name}</h3>

      <a href={mapsSearch} target="_blank" rel="noopener noreferrer" className="loc-address">
        <MapPinIcon /> {loc.address}
      </a>

      <p className="loc-meta">
        <ClockIcon /> {loc.hours}
      </p>
      <p className="loc-meta">
        <TruckIcon /> {loc.delivery}
      </p>

      <div className="loc-actions">
        <a href={`tel:${loc.phone}`} className="loc-btn loc-btn--outline">Call</a>
        <a href={mapsDir} target="_blank" rel="noopener noreferrer" className="loc-btn loc-btn--outline">Directions</a>
        <a href={loc.reviewUrl} target="_blank" rel="noopener noreferrer" className="loc-btn loc-btn--outline">Review</a>
        <a href={loc.infoUrl} target="_blank" rel="noopener noreferrer" className="loc-btn loc-btn--green">More Info</a>
      </div>
    </div>
  )
}

function LocationsSection() {
  const [ref, visible] = useReveal(0.03)

  return (
    <section className="locs-section" ref={ref}>
      <div className="container">
        <div className={`locs-header${visible ? ' is-visible' : ''}`}>
          <h2 className="locs-h2">New York City, NY | CBD Kratom</h2>
          <p className="locs-sub">Browse store details, hours &amp; reviews</p>
          <span className="locs-count-badge">12 Locations</span>
        </div>

        <div className="locs-grid">
          {LOCATIONS.map((loc, i) => (
            <LocationCard key={loc.name} loc={loc} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// ABOUT
// ─────────────────────────────────────────────

function AboutSection() {
  const [ref, visible] = useReveal(0.1)

  const stats = [
    { num: '12', label: 'Locations', sub: 'Manhattan, Brooklyn & Queens' },
    { num: '8am–10pm', label: 'Daily', sub: 'Open 7 days a week' },
    { num: '3rd-Party', label: 'Lab Tested', sub: 'Every product verified' },
    { num: 'Free', label: 'Delivery', sub: 'Local 9am–9pm + free shipping $100+' },
  ]

  return (
    <section className="about-section" ref={ref}>
      <div className="container">
        <div className={`about-inner${visible ? ' is-visible' : ''}`}>
          <p className="about-eyebrow">Your Local CBD &amp; Kratom Destination</p>
          <h2 className="about-h2">Why New York City Shops at CBD Kratom</h2>
          <p className="about-body">
            CBD Kratom is New York City's trusted source for <strong>CBD, Kratom, Delta-8, Delta-9, and wellness products</strong>.
            With <strong>12 locations across Manhattan, Brooklyn, and Queens</strong> — including SoHo, Chelsea, Flatiron, Times Square,
            NoHo, Upper East Side, Upper West Side, Lenox Hill, Financial District, Downtown Brooklyn, Williamsburg, and Forest Hills
            — there's always a store in your neighborhood.
          </p>
          <p className="about-body">
            Every location carries capsules, powder, edibles, tinctures, vapes, topicals, beverages, and CBD for pets.
            All products are <strong>3rd-party lab tested</strong>. Most stores open <strong>8am to 10pm</strong> with local
            delivery 9am–9pm and free shipping on orders over $100.
          </p>

          <div className="about-stats">
            {stats.map((s) => (
              <div key={s.label} className="about-stat">
                <p className="about-stat-num">{s.num}</p>
                <p className="about-stat-label">{s.label}</p>
                <p className="about-stat-sub">{s.sub}</p>
              </div>
            ))}
          </div>

          <a href="https://shopcbdkratom.com/collections/all" target="_blank" rel="noopener noreferrer" className="btn-green-outline">
            Shop All Products →
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-q" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span>{faq.q}</span>
        <span className="faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="faq-a"><p>{faq.a}</p></div>}
    </div>
  )
}

function FaqSection() {
  const [ref, visible] = useReveal(0.1)
  return (
    <section className="faq-section" ref={ref}>
      <div className="container">
        <h2 className={`faq-h2${visible ? ' is-visible' : ''}`}>
          Frequently Asked Questions — NYC
        </h2>
        <p className={`faq-sub${visible ? ' is-visible' : ''}`}>
          Everything you need to know about shopping CBD and Kratom at our New York City locations.
        </p>
        <div className={`faq-list${visible ? ' is-visible' : ''}`}>
          {FAQS.map(f => <FaqItem key={f.q} faq={f} />)}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <a href="https://shopcbdkratom.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://shopcbdkratom.com/cdn/shop/files/logo-white.png?v=1716393204&width=400"
            alt="CBD Kratom"
            className="footer-logo"
          />
        </a>
        <p className="footer-legal">
          © {new Date().getFullYear()} CBD Kratom. All rights reserved.&nbsp;
          Valid in-store only at participating NYC locations. One redemption per customer.
          Cannot be combined with other offers. Must be 21+.
        </p>
        <nav className="footer-links">
          {[
            ['Privacy Policy', 'https://shopcbdkratom.com/pages/privacy-policy'],
            ['Terms of Service', 'https://shopcbdkratom.com/pages/terms-of-service'],
            ['Shipping Policy', 'https://shopcbdkratom.com/pages/shipping-policy'],
            ['Shop Online', 'https://shopcbdkratom.com/collections/all'],
          ].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-link">{label}</a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────

export default function App() {
  return (
    <div className="page">
      <AnnouncementBar />
      <Nav />
      <Hero />
      <BarcodeSection />
      <LocationsSection />
      <AboutSection />
      <FaqSection />
      <Footer />
    </div>
  )
}
