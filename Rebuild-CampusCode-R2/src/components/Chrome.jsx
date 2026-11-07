import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FOOTER, NAV } from '../data/content.js'

export function Mark({ compact = false }) {
  return (
    <span className={`mark${compact ? ' mark--compact' : ''}`}>
      <span className="mark__seal" aria-hidden="true">CC</span>
      <span>
        <strong>CAMPUSCODE</strong>
        {!compact && <small>HACKATHON ARENA</small>}
      </span>
    </span>
  )
}

export function SiteHeader({ solid = false }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={`site-header${solid ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <Link to="/" className="mark-link" aria-label="CampusCode home">
        <Mark />
      </Link>
      <button type="button" className="nav-toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? 'CLOSE' : 'MENU'}
      </button>
      <nav className="site-nav" aria-label="Primary">
        {NAV.map((item) => (
          <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
      </nav>
      <div className="site-header__actions">
        <Link to="/login" className="text-link">LOGIN</Link>
        <Link to="/register" className="btn btn--ink">
          JOIN CAMPUSCODE <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <Mark />
          <p className="site-footer__lead">
            The student hackathon arena.<br />
            You build the idea, we run the competition.
          </p>
          <p className="site-footer__status"><i /> ALL SYSTEMS OPERATIONAL</p>
        </div>
        <FooterCol title="PRODUCT" links={FOOTER.product} />
        <FooterCol title="BUILDERS" links={FOOTER.builders} />
        <FooterCol title="GUIDES" links={FOOTER.guides} />
      </div>
      <p className="site-footer__word" aria-hidden="true">CampusCode</p>
      <div className="site-footer__bar">
        <span>© 2026 CAMPUSCODE</span>
        <span>LEARN · BUILD · COMPETE · SHIP</span>
        <span className="site-footer__legal">
          <Link to="/terms">TERMS</Link>
          <Link to="/privacy">PRIVACY</Link>
          <Link to="/contact">CONTACT</Link>
        </span>
        <span>CHENNAI · INDIA</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div className="site-footer__col">
      <h3>{title}</h3>
      {links.map((link) => (
        link.href.startsWith('/') && !link.href.includes('#')
          ? <Link key={link.label} to={link.href}>{link.label}</Link>
          : <a key={link.label} href={link.href}>{link.label}</a>
      ))}
    </div>
  )
}

export function AuthShell({ children, back = true }) {
  return (
    <div className="auth-page">
      <div className="auth-page__top">
        <Link to="/" aria-label="CampusCode home"><Mark /></Link>
        {back && <Link to="/" className="text-link">BACK TO HOME</Link>}
      </div>
      {children}
      <div className="auth-page__legal">
        <span>CAMPUSCODE © 2026</span>
        <span>LEARN · BUILD · COMPETE · SHIP</span>
        <span><i /> ALL SYSTEMS OPERATIONAL</span>
      </div>
    </div>
  )
}

export function InfoLayout({ kicker, title, lede, children }) {
  return (
    <div className="info-page">
      <SiteHeader solid />
      <main className="info-page__main">
        <p className="kicker">{kicker}</p>
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

export function NavItem({ to, children, end = false }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `rail__link${isActive ? ' is-active' : ''}`}>
      {children}
    </NavLink>
  )
}
