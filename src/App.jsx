import { useState, useEffect, useRef } from 'react'

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useCountdown() {
  const getTimeLeft = () => {
    const now = new Date()
    const end = new Date()
    end.setHours(23, 59, 59, 0)
    const diff = Math.max(end - now, 0)
    return {
      hours: Math.floor(diff / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }
  const [time, setTime] = useState(getTimeLeft())
  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─────────────────────────────────────────────
// ANNOUNCEMENT BAR
// ─────────────────────────────────────────────

function AnnouncementBar() {
  const { hours, minutes, seconds } = useCountdown()
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="ann-bar">
      <div className="ann-inner">
        <span className="ann-statue">🗽</span>
        <span className="ann-text">
          Welcome back, New York! Enjoy{' '}
          <strong className="ann-strong">20% OFF</strong> your entire order.
          &nbsp;Use code:{' '}
          <span className="ann-code">NYBACK20</span>
        </span>
        <span className="ann-countdown">
          Offer expires:{' '}
          <span className="ann-time">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────

function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-brand">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M14 2C14 2 6 8 6 16C6 20.4183 9.58172 24 14 24C18.4183 24 22 20.4183 22 16C22 8 14 2 14 2Z" fill="#1C3A22"/>
            <path d="M14 8C14 8 9 12 9 17C9 19.7614 11.2386 22 14 22C16.7614 22 19 19.7614 19 17C19 12 14 8 14 8Z" fill="#C9A84C" opacity="0.85"/>
            <path d="M14 12V24" stroke="#1C3A22" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="nav-logo-text">CBD Kratom</span>
        </div>
        <a
          href="https://shopcbdkratom.com/collections"
          className="nav-shop-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop Now
        </a>
      </div>
    </nav>
  )
}

// ─────────────────────────────────────────────
// HERO WINBACK
// ─────────────────────────────────────────────

function HeroWinback() {
  const [ref, visible] = useReveal(0.05)

  return (
    <section className="hero" ref={ref}>
      <div className="hero-noise" />
      <div className="hero-radial" />
      <div className="hero-fade-bottom" />

      <div className={`hero-content${visible ? ' is-visible' : ''}`}>
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Exclusive Offer &nbsp;·&nbsp; New York City
        </div>

        <h1 className="hero-h1">
          New York, It's Been
          <br />a While. We've Missed You.
        </h1>

        <p className="hero-sub">
          Your wellness routine shouldn't miss a beat. Welcome back to CBD
          Kratom! To celebrate your return, we're giving you an exclusive{' '}
          <strong>20% off</strong> your next order. Rediscover your favorite
          strains, explore our newest CBD arrivals, and find your perfect balance
          today.
        </p>

        <div className="hero-actions">
          <a
            href="https://shopcbdkratom.com/collections"
            className="btn-gold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop the NY Collection
            <span className="btn-arrow">→</span>
          </a>
        </div>

        <p className="hero-footnote">
          Discount automatically applied at checkout &nbsp;·&nbsp; or use code{' '}
          <strong>NYBACK20</strong>
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// VALUE PROPS
// ─────────────────────────────────────────────

const VALUE_PROPS = [
  {
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="14" width="34" height="22" rx="3" stroke="#1C3A22" strokeWidth="2.2"/>
        <path d="M38 20h4a2 2 0 012 2v8a2 2 0 01-2 2h-4" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="13" cy="40" r="3.5" stroke="#1C3A22" strokeWidth="2.2"/>
        <circle cx="29" cy="40" r="3.5" stroke="#1C3A22" strokeWidth="2.2"/>
        <path d="M9.5 40H4M16.5 40H25.5M32.5 40H38" stroke="#1C3A22" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M14 19v8M20 17v10M26 21v6" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Fast Shipping to NY',
    body: 'Get your wellness essentials delivered quickly and discreetly right to your door.',
  },
  {
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8h12v6l4 4v18a2 2 0 01-2 2H16a2 2 0 01-2-2V18l4-4V8z" stroke="#1C3A22" strokeWidth="2.2" strokeLinejoin="round"/>
        <circle cx="24" cy="28" r="6" stroke="#C9A84C" strokeWidth="2.2"/>
        <path d="M24 22v-6M21.5 25.5l-4-4M26.5 25.5l4-4" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="24" cy="28" r="2" fill="#C9A84C"/>
      </svg>
    ),
    title: 'Lab-Tested Purity',
    body: 'Every product is third-party lab tested to guarantee potency, quality, and peace of mind.',
  },
  {
    svg: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 6C24 6 12 14 12 26C12 32.627 17.373 38 24 38C30.627 38 36 32.627 36 26C36 14 24 6 24 6Z" stroke="#1C3A22" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M24 14C24 14 17 19 17 26C17 29.866 20.134 33 24 33C27.866 33 31 29.866 31 26C31 19 24 14 24 14Z" fill="#C9A84C" fillOpacity="0.25" stroke="#C9A84C" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M24 14V38" stroke="#1C3A22" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 21C21.5 22.5 22.5 24 24 24" stroke="#1C3A22" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M28 18C26.5 19.5 25.5 21 24 22" stroke="#1C3A22" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Premium Sourcing',
    body: 'We source only the highest quality, pure ingredients for all our CBD and Kratom lines.',
  },
]

function ValueProps() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section className="vp-section" ref={ref}>
      <div className="container">
        <h2 className={`section-h2${visible ? ' is-visible' : ''}`}>
          The CBD Kratom Standard
        </h2>

        <div className="vp-grid">
          {VALUE_PROPS.map((vp, i) => (
            <div
              key={i}
              className={`vp-card${visible ? ' is-visible' : ''}`}
              style={{ '--delay': `${i * 0.14}s` }}
            >
              <div className="vp-icon-wrap">{vp.svg}</div>
              <h3 className="vp-title">{vp.title}</h3>
              <p className="vp-body">{vp.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PRODUCT GRID
// ─────────────────────────────────────────────

const PRODUCTS = [
  {
    name: 'Premium Maeng Da Kratom Powder',
    price: '$19.95',
    reviews: 124,
    tag: 'Best Seller',
    hue: '140, 58%, 18%',
    icon: '🌿',
    url: 'https://shopcbdkratom.com/collections/kratom',
  },
  {
    name: 'Green Malay Kratom Capsules',
    price: '$24.95',
    reviews: 98,
    tag: 'Top Rated',
    hue: '148, 44%, 24%',
    icon: '💊',
    url: 'https://shopcbdkratom.com/collections/kratom',
  },
  {
    name: 'Full Spectrum CBD Oil 1000mg',
    price: '$49.95',
    reviews: 203,
    tag: 'Staff Pick',
    hue: '130, 50%, 20%',
    icon: '💧',
    url: 'https://shopcbdkratom.com/collections/tinctures-extracts',
  },
  {
    name: 'Red Bali Kratom Powder',
    price: '$17.95',
    reviews: 87,
    tag: null,
    hue: '10, 55%, 22%',
    icon: '🌺',
    url: 'https://shopcbdkratom.com/collections/kratom',
  },
  {
    name: 'CBD Gummies 25mg',
    price: '$34.95',
    reviews: 156,
    tag: 'New Arrival',
    hue: '30, 60%, 22%',
    icon: '🍬',
    url: 'https://shopcbdkratom.com/collections/edibles',
  },
  {
    name: 'White Borneo Kratom Powder',
    price: '$19.95',
    reviews: 72,
    tag: null,
    hue: '165, 45%, 22%',
    icon: '✨',
    url: 'https://shopcbdkratom.com/collections/kratom',
  },
]

function StarRating({ count = 5 }) {
  return (
    <span className="stars" aria-label={`${count} out of 5 stars`}>
      {'★'.repeat(count)}
      {'☆'.repeat(5 - count)}
    </span>
  )
}

function ProductCard({ product, index, visible }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article
      className={`product-card${visible ? ' is-visible' : ''}`}
      style={{ '--delay': `${index * 0.07}s` }}
    >
      {product.tag && (
        <span className="product-badge">{product.tag}</span>
      )}

      <div
        className="product-img"
        style={{
          background: `linear-gradient(145deg, hsl(${product.hue}) 0%, hsl(${product.hue} / 0.75) 100%)`,
        }}
      >
        <span className="product-img-icon" role="img">{product.icon}</span>
        <div className="product-img-sheen" />
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-meta">
          <StarRating />
          <span className="product-review-count">{product.reviews} Reviews</span>
        </div>
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button
            className={`btn-cart${added ? ' btn-cart--added' : ''}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <span className="btn-cart-check">✓</span> Added
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

function ProductGrid() {
  const [ref, visible] = useReveal(0.05)

  return (
    <section className="pg-section" ref={ref}>
      <div className="container">
        <h2 className={`section-h2${visible ? ' is-visible' : ''}`}>
          Trending Now in New York
        </h2>
        <p
          className={`section-lead${visible ? ' is-visible' : ''}`}
          style={{ '--delay': '0.1s' }}
        >
          Not sure where to start? Check out what other NY locals are adding to
          their carts right now.
        </p>

        <div className="pg-grid">
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.name}
              product={product}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// SOCIAL PROOF
// ─────────────────────────────────────────────

function SocialProof() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section className="sp-section" ref={ref}>
      <div
        className={`sp-inner${visible ? ' is-visible' : ''}`}
      >
        <div className="sp-quote-mark">&ldquo;</div>

        <div className="sp-stars">
          <StarRating />
        </div>

        <blockquote className="sp-quote">
          I took a break from ordering, but coming back to CBD Kratom reminded
          me why I loved them. The quality is unmatched and shipping to Brooklyn
          was incredibly fast!
        </blockquote>

        <footer className="sp-footer">
          <p className="sp-author">— Sarah T., New York</p>
          <span className="sp-verified">
            <span className="sp-check">✓</span> Verified Customer
          </span>
        </footer>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// BOTTOM CTA
// ─────────────────────────────────────────────

function BottomCTA() {
  const [ref, visible] = useReveal(0.1)

  return (
    <section className="bcta-section" ref={ref}>
      <div className="bcta-noise" />
      <div className="bcta-radial" />

      <div className={`bcta-inner${visible ? ' is-visible' : ''}`}>
        <div className="bcta-badge">Limited Time Offer</div>

        <h2 className="bcta-h2">
          Ready to Pick Up
          <br />Where You Left Off?
        </h2>

        <p className="bcta-body">
          Your exclusive winback discount is waiting. Claim your{' '}
          <strong>20% off</strong> before this offer expires.
        </p>

        <a
          href="https://shopcbdkratom.com/collections"
          className="btn-gold btn-gold--large"
          target="_blank"
          rel="noopener noreferrer"
        >
          Claim My Discount &amp; Shop Now
          <span className="btn-arrow">→</span>
        </a>

        <p className="bcta-note">
          Use code <strong>NYBACK20</strong> at checkout &nbsp;·&nbsp; Free
          shipping on orders $100+
        </p>
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
        <div className="footer-brand">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M14 2C14 2 6 8 6 16C6 20.4183 9.58172 24 14 24C18.4183 24 22 20.4183 22 16C22 8 14 2 14 2Z" fill="#4A7C54"/>
            <path d="M14 8C14 8 9 12 9 17C9 19.7614 11.2386 22 14 22C16.7614 22 19 19.7614 19 17C19 12 14 8 14 8Z" fill="#C9A84C" opacity="0.7"/>
          </svg>
          <span className="footer-logo-text">CBD Kratom</span>
        </div>

        <p className="footer-legal">
          © {new Date().getFullYear()} CBD Kratom. All rights reserved. These
          products are not intended to diagnose, treat, cure, or prevent any
          disease. Must be 21+ to purchase. Offer valid while supplies last.
          Cannot be combined with other offers.
        </p>

        <nav className="footer-links" aria-label="Footer links">
          <a href="https://shopcbdkratom.com/pages/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <span className="footer-divider" aria-hidden="true">·</span>
          <a href="https://shopcbdkratom.com/pages/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          <span className="footer-divider" aria-hidden="true">·</span>
          <a href="https://shopcbdkratom.com/pages/shipping-policy" target="_blank" rel="noopener noreferrer">Shipping Policy</a>
        </nav>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────

export default function App() {
  return (
    <div className="page">
      <AnnouncementBar />
      <Nav />
      <HeroWinback />
      <ValueProps />
      <ProductGrid />
      <SocialProof />
      <BottomCTA />
      <Footer />
    </div>
  )
}
