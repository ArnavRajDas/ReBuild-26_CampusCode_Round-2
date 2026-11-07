import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Mark } from '../../components/Chrome.jsx'
import { StudentProvider, useStudent } from '../../context/StudentContext.jsx'
import { WIDGETS } from '../../data/content.js'
import { logoutUser } from '../../lib/auth.js'

const LINKS = [
  ['Overview', '/student', true],
  ['Events', '/student/events', false],
  ['My Events', '/student/my-events', false],
  ['HackMate AI', '/student/hackmate', false],
  ['IdeaCheck AI', '/student/ideacheck', false],
  ['Certificates', '/student/certificates', false],
  ['Digital Card', '/student/digital-card', false],
  ['RuleBot AI', '/student/rulebot', false],
  ['Student Guide', '/student/guide', false],
  ['Official Communication', '/student/communication', false],
  ['Notifications', '/student/notifications', false],
  ['Help & Support', '/student/help', false],
  ['Profile', '/student/profile', false],
]

export default function StudentShell() {
  return (
    <StudentProvider>
      <Frame />
    </StudentProvider>
  )
}

function Frame() {
  const navigate = useNavigate()
  const student = useStudent()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  function logout() {
    logoutUser()
    navigate('/')
  }

  function search(event) {
    event.preventDefault()
    navigate(`/student/events?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
  }

  return (
    <div className="workspace" data-layout={student.prefs.layoutStyle} data-look={student.prefs.appearance}>
      <aside className={`rail${open ? ' is-open' : ''}`}>
        <Link to="/" className="rail__brand" onClick={() => setOpen(false)}><Mark compact /></Link>
        <p className="rail__label">Workspace</p>
        <nav>
          {LINKS.map(([label, to, end]) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `rail__link${isActive ? ' is-active' : ''}`} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="rail__custom" onClick={() => { student.openPanel(); setOpen(false) }}>
          Customize dashboard
          <small>Make it yours</small>
        </button>
      </aside>
      {open && <button className="rail-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <div className="workspace__main">
        <header className="workspace__top">
          <button type="button" className="menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">Menu</button>
          <form onSubmit={search} className="workspace__search">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events" aria-label="Search events" />
          </form>
          <div className="workspace__who">
            <span>{student.user?.fullName || 'Student'}</span>
            <button type="button" onClick={logout}>Log out</button>
          </div>
        </header>
        <Outlet />
      </div>
      {student.panelOpen && <Customize />}
    </div>
  )
}

function Customize() {
  const { draft, closePanel, move, toggleHidden, setLayout, setAppearance, reset } = useStudent()
  return (
    <div className="sheet" role="dialog" aria-labelledby="custom-title">
      <div className="sheet__card sheet__card--wide">
        <p className="kicker">WORKSPACE</p>
        <h3 id="custom-title">Customize dashboard</h3>
        <div className="custom-grid">
          <div>
            <p className="panel-label">Widgets</p>
            <ul className="widget-list">
              {draft.order.map((id) => {
                const widget = WIDGETS.find((item) => item.id === id)
                return (
                  <li key={id}>
                    <label>
                      <input type="checkbox" checked={!draft.hidden.includes(id)} onChange={() => toggleHidden(id)} />
                      {widget?.label}
                    </label>
                    <span>
                      <button type="button" onClick={() => move(id, -1)} aria-label={`Move ${widget?.label} up`}>↑</button>
                      <button type="button" onClick={() => move(id, 1)} aria-label={`Move ${widget?.label} down`}>↓</button>
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <p className="panel-label">Layout</p>
            <div className="chip-row">
              {['default', 'compact', 'minimal'].map((id) => (
                <button key={id} type="button" className={draft.layoutStyle === id ? 'chip is-on' : 'chip'} onClick={() => setLayout(id)}>{id}</button>
              ))}
            </div>
            <p className="panel-label">Accent</p>
            <div className="chip-row">
              {[
                ['balanced', 'Balanced'],
                ['terra', 'Terracotta'],
                ['pine', 'Pine'],
              ].map(([id, label]) => (
                <button key={id} type="button" className={draft.appearance === id ? 'chip is-on' : 'chip'} onClick={() => setAppearance(id)}>{label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="sheet__actions">
          <button type="button" className="btn btn--ghost" onClick={reset}>Reset</button>
          <button type="button" className="btn btn--ghost" onClick={() => closePanel(true)}>Cancel</button>
          <button type="button" className="btn btn--ink" onClick={() => closePanel(false)}>Done</button>
        </div>
      </div>
    </div>
  )
}
