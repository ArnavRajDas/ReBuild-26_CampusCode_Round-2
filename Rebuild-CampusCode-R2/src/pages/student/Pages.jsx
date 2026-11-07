import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  DEFAULT_NOTIFICATIONS,
  EVENTS,
  GUIDE_SECTIONS,
  HELP_TOPICS,
  OFFICIAL_NOTES,
  PAID_INVITE_CODE,
  RULES,
  WIDGETS,
} from '../../data/content.js'
import { useStudent } from '../../context/StudentContext.jsx'

function useTitle(title) {
  useEffect(() => { document.title = `${title} — CampusCode` }, [title])
}

function PageHead({ kicker, title, text }) {
  return (
    <header className="desk-head">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  )
}

export function Overview() {
  useTitle('Overview')
  const { prefs, user, records, tasks } = useStudent()
  const visible = prefs.order.filter((id) => !prefs.hidden.includes(id))
  return (
    <div className="desk">
      <PageHead
        kicker="STUDENT WORKSPACE"
        title={`Hello, ${(user?.fullName || 'Student').split(' ')[0]}.`}
        text="Your events, deadlines and tools live on this desk. Drag the order from Customize dashboard."
      />
      <div className="widget-board">
        {visible.map((id) => (
          <section key={id} className={`widget widget--${WIDGETS.find((item) => item.id === id)?.span || 'half'}`} data-widget={id}>
            <Widget id={id} records={records} tasks={tasks} user={user} />
          </section>
        ))}
      </div>
    </div>
  )
}

function Widget({ id, records, tasks, user }) {
  const student = useStudent()
  if (id === 'welcome') {
    return (
      <>
        <p className="widget__label">Welcome</p>
        <h2>The arena is open.</h2>
        <p>{user?.fullName} · {user?.email}</p>
        <p className="widget__meta">{records.length} joined · {tasks.filter((task) => !task.done).length} open tasks</p>
      </>
    )
  }
  if (id === 'featured') {
    const event = EVENTS[0]
    return (
      <>
        <p className="widget__label">Featured event</p>
        <div className="featured">
          <span>{event.status}</span>
          <h2>{event.title}</h2>
          <p>{event.short}</p>
          <Link to="/student/events">Open events ↗</Link>
        </div>
      </>
    )
  }
  if (id === 'stats') {
    const done = tasks.filter((task) => task.done).length
    const certs = records.filter((row) => row.status === 'COMPLETED').length
    const stats = [
      [records.length, 'Joined'],
      [EVENTS.filter((event) => event.timing === 'upcoming').length, 'Upcoming'],
      [done, 'Tasks done'],
      [certs, 'Certificates'],
    ]
    return (
      <>
        <p className="widget__label">Stats</p>
        <ul className="stat-row">
          {stats.map(([value, label]) => <li key={label}><strong>{value}</strong><span>{label}</span></li>)}
        </ul>
      </>
    )
  }
  if (id === 'upcoming') {
    return (
      <>
        <p className="widget__label">Upcoming events</p>
        <ul className="plain-list">
          {EVENTS.filter((event) => event.timing === 'upcoming').map((event) => (
            <li key={event.id}><strong>{event.title}</strong><span>{event.date}</span></li>
          ))}
        </ul>
      </>
    )
  }
  if (id === 'tasks') {
    return (
      <>
        <p className="widget__label">My tasks</p>
        <ul className="task-list">
          {student.tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input type="checkbox" checked={task.done} onChange={() => student.toggleTask(task.id)} />
                <span>{task.label}</span>
              </label>
              <em>{task.when}</em>
            </li>
          ))}
        </ul>
      </>
    )
  }
  if (id === 'progress') {
    const done = tasks.filter((task) => task.done).length
    const pct = Math.round((done / Math.max(tasks.length, 1)) * 100)
    return (
      <>
        <p className="widget__label">My progress</p>
        <h2>{pct}%</h2>
        <div className="meter"><i style={{ width: `${pct}%` }} /></div>
        <p>{done} of {tasks.length} tasks checked off.</p>
      </>
    )
  }
  if (id === 'calendar') return <MonthCalendar />
  if (id === 'deadlines') {
    return (
      <>
        <p className="widget__label">Deadlines</p>
        <ul className="plain-list">
          <li><strong>ReBuild ’26 round window</strong><span>6–7 Nov</span></li>
          <li><strong>Build Night</strong><span>14 Nov</span></li>
          <li><strong>Arena Orientation</strong><span>18 Nov</span></li>
        </ul>
      </>
    )
  }
  if (id === 'spotlight') {
    return (
      <>
        <p className="widget__label">Spotlight</p>
        <h2>Find your people.</h2>
        <p>Build with developers. Think with designers. Compete with builders.</p>
      </>
    )
  }
  if (id === 'activity') {
    return (
      <>
        <p className="widget__label">Current activity</p>
        <ul className="plain-list">
          {records.slice(0, 3).map((row) => (
            <li key={row.id}><strong>{row.title}</strong><span>{row.status}</span></li>
          ))}
        </ul>
      </>
    )
  }
  return (
    <>
      <p className="widget__label">Notifications</p>
      <ul className="plain-list">
        {DEFAULT_NOTIFICATIONS.slice(0, 3).map((note) => (
          <li key={note.id}><strong>{note.title}</strong><span>{note.time}</span></li>
        ))}
      </ul>
    </>
  )
}

function MonthCalendar() {
  const marks = new Set(EVENTS.map((event) => event.dateIso).filter(Boolean))
  const start = new Date(2026, 10, 1).getDay()
  const days = Array.from({ length: 30 }, (_, index) => index + 1)
  return (
    <>
      <p className="widget__label">Calendar · November 2026</p>
      <div className="cal">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => <span key={`${day}${index}`} className="cal__dow">{day}</span>)}
        {Array.from({ length: start }, (_, index) => <span key={`e${index}`} />)}
        {days.map((day) => {
          const iso = `2026-11-${String(day).padStart(2, '0')}`
          return <span key={day} className={marks.has(iso) ? 'is-mark' : ''}>{day}</span>
        })}
      </div>
    </>
  )
}

export function Events() {
  useTitle('Events')
  const student = useStudent()
  const [params] = useSearchParams()
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState(params.get('q') || '')
  const [dialog, setDialog] = useState(null)
  const [team, setTeam] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => { setQuery(params.get('q') || '') }, [params])

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return EVENTS.filter((event) => {
      const bucket = filter === 'All'
        || event.category === filter
        || (filter === 'Upcoming' && event.timing === 'upcoming')
        || (filter === 'Past' && event.timing === 'past')
      const hit = !needle || `${event.title} ${event.description} ${event.category}`.toLowerCase().includes(needle)
      return bucket && hit
    })
  }, [filter, query])

  function openJoin(event) {
    setError('')
    setTeam('')
    setCode('')
    setDialog(event)
  }

  function confirmJoin(event) {
    event.preventDefault()
    if (dialog.paid && code.trim().toUpperCase() !== PAID_INVITE_CODE) {
      setError('That invite code is not valid. The demo code is listed under Official Communication.')
      return
    }
    if (dialog.type === 'hackathon' && team.trim().length < 2) {
      setError('Add a team name. Use the same name on Unstop and every submission.')
      return
    }
    student.register(dialog.id, team)
    setNotice(`${dialog.title} is on your desk.`)
    setDialog(null)
  }

  return (
    <div className="desk">
      <PageHead kicker="CATALOGUE" title="Events" text="Register to receive an id and a team label. Save anything you want to revisit." />
      <div className="toolbar">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events" aria-label="Filter events" />
        <div className="chip-row">
          {['All', 'Hackathon', 'Quiz', 'Workshop', 'Meetup', 'Upcoming', 'Past'].map((item) => (
            <button key={item} type="button" className={filter === item ? 'chip is-on' : 'chip'} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
      </div>
      {notice && <p className="form-note">{notice}</p>}
      <div className="event-grid">
        {list.map((event) => (
          <article key={event.id} className="event-card">
            <div className="event-card__top">
              <span className="seal">{event.circle}</span>
              <em>{event.status}</em>
            </div>
            <p className="widget__label">{event.category}</p>
            <h2>{event.title}</h2>
            <p>{event.short}</p>
            <ul className="facts">
              {event.facts.map(([label, value]) => <li key={label}><span>{label}</span><strong>{value}</strong></li>)}
            </ul>
            <div className="event-card__actions">
              {student.isJoined(event.id) ? (
                <span className="pill">Joined</span>
              ) : event.timing === 'past' ? (
                <span className="pill">Closed</span>
              ) : (
                <button type="button" className="btn btn--ink" onClick={() => openJoin(event)}>Register</button>
              )}
              <button type="button" className="btn btn--ghost" onClick={() => student.toggleWish(event.id)}>
                {student.isWished(event.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="empty">No events match that filter.</p>}
      {dialog && (
        <div className="sheet" role="dialog" aria-labelledby="join-title">
          <form className="sheet__card" onSubmit={confirmJoin}>
            <p className="kicker">{dialog.category}</p>
            <h3 id="join-title">{dialog.title}</h3>
            <p>{dialog.description}</p>
            {(dialog.type === 'hackathon' || dialog.paid) && (
              <label className="field">
                <span>TEAM NAME</span>
                <span className="field__box"><input value={team} onChange={(e) => setTeam(e.target.value)} placeholder="Same name as Unstop" /></span>
              </label>
            )}
            {dialog.paid && (
              <label className="field">
                <span>INVITE CODE</span>
                <span className="field__box"><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Paid event code" /></span>
              </label>
            )}
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className="sheet__actions">
              <button className="btn btn--ink" type="submit">Confirm registration</button>
              <button className="btn btn--ghost" type="button" onClick={() => setDialog(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export function MyEvents() {
  useTitle('My Events')
  const { records, wishlist } = useStudent()
  const saved = EVENTS.filter((event) => wishlist.includes(event.id))
  return (
    <div className="desk">
      <PageHead kicker="YOUR DESK" title="My events" text="Every event this account has joined, with the registration id you would quote on a submission." />
      {records.length === 0 && <p className="empty">You have not joined an event yet.</p>}
      <div className="stack">
        {records.map((row) => (
          <article key={row.id} className="record">
            <div>
              <p className="widget__label">{row.category} · {row.status}</p>
              <h2>{row.title}</h2>
              <p>{row.location} · {row.date}</p>
            </div>
            <dl>
              <div><dt>Registration</dt><dd>{row.registration}</dd></div>
              <div><dt>Team</dt><dd>{row.team}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <h2 className="section-title">Saved</h2>
      {saved.length === 0 ? <p className="empty">Nothing saved yet.</p> : (
        <ul className="plain-list plain-list--page">
          {saved.map((event) => <li key={event.id}><strong>{event.title}</strong><span>{event.status}</span></li>)}
        </ul>
      )}
    </div>
  )
}

export function HackMate() {
  useTitle('HackMate AI')
  const [brief, setBrief] = useState({ idea: '', role: 'Developer', hours: '12' })
  const [result, setResult] = useState(null)

  function onSubmit(event) {
    event.preventDefault()
    const idea = brief.idea.trim()
    if (idea.length < 12) return
    setResult({
      title: idea.split(' ').slice(0, 6).join(' '),
      role: brief.role,
      hours: brief.hours,
      plan: [
        'Name the person who has the problem, in one sentence.',
        `Spend the first ${Math.max(2, Math.round(Number(brief.hours) / 4))} hours on the screen people actually touch.`,
        'Keep the demo frontend-only and use the mock catalogue already in the workspace.',
        'Write the team name once and reuse it on every file.',
      ],
    })
  }

  return (
    <div className="desk desk--narrow">
      <PageHead kicker="WORKSPACE TOOL" title="HackMate AI" text="Frames a team brief from your idea. It runs in this browser and does not call an external model." />
      <form className="tool-form" onSubmit={onSubmit}>
        <label>Idea<textarea required minLength={12} rows={4} value={brief.idea} onChange={(e) => setBrief({ ...brief, idea: e.target.value })} placeholder="What are you building, and for whom?" /></label>
        <div className="split">
          <label>Your role
            <select value={brief.role} onChange={(e) => setBrief({ ...brief, role: e.target.value })}>
              {['Developer', 'Designer', 'Organizer'].map((role) => <option key={role}>{role}</option>)}
            </select>
          </label>
          <label>Hours<input type="number" min="4" max="48" value={brief.hours} onChange={(e) => setBrief({ ...brief, hours: e.target.value })} /></label>
        </div>
        <button className="btn btn--ink" type="submit">Write the brief</button>
      </form>
      {result && (
        <article className="result">
          <p className="widget__label">{result.role} · {result.hours} hours</p>
          <h2>{result.title}</h2>
          <ol>{result.plan.map((line) => <li key={line}>{line}</li>)}</ol>
        </article>
      )}
    </div>
  )
}

export function IdeaCheck() {
  useTitle('IdeaCheck AI')
  const [idea, setIdea] = useState('')
  const [report, setReport] = useState(null)

  function onSubmit(event) {
    event.preventDefault()
    const text = idea.trim()
    const checks = [
      { label: 'Names a person', ok: /student|user|organizer|campus|people/i.test(text) },
      { label: 'Names a problem', ok: /problem|hard|slow|miss|confus|need/i.test(text) },
      { label: 'Fits a frontend demo', ok: text.length > 40 && !/blockchain|train a model|production database/i.test(text) },
      { label: 'Can be shown in a click-through', ok: /page|dashboard|form|screen|flow|site/i.test(text) || text.length > 80 },
    ]
    const score = checks.filter((item) => item.ok).length * 25
    setReport({ score, checks })
  }

  return (
    <div className="desk desk--narrow">
      <PageHead kicker="WORKSPACE TOOL" title="IdeaCheck AI" text="Scores a concept against a frontend-only hackathon scope." />
      <form className="tool-form" onSubmit={onSubmit}>
        <label>Concept<textarea required minLength={20} rows={5} value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Describe the product in a few sentences." /></label>
        <button className="btn btn--ink" type="submit">Score it</button>
      </form>
      {report && (
        <article className="result">
          <h2>{report.score}/100</h2>
          <ul className="plain-list">
            {report.checks.map((item) => <li key={item.label}><strong>{item.label}</strong><span>{item.ok ? 'Holds' : 'Thin'}</span></li>)}
          </ul>
        </article>
      )}
    </div>
  )
}

export function Certificates() {
  useTitle('Certificates')
  const { records, user } = useStudent()
  const ready = records.filter((row) => row.status === 'COMPLETED')

  function printCert(row) {
    const popup = window.open('', '_blank', 'noopener,noreferrer,width=900,height=640')
    if (!popup) return
    popup.document.write(`<!doctype html><title>Certificate</title><body style="font-family:Georgia,serif;margin:48px;color:#1a1612"><p style="letter-spacing:.2em">CAMPUSCODE</p><h1>Certificate of participation</h1><p>This confirms that <strong>${user?.fullName || 'Student'}</strong> took part in <strong>${row.title}</strong>.</p><p>Registration ${row.registration}</p><p>Chennai · 2026</p><script>print()<\/script></body>`)
    popup.document.close()
  }

  return (
    <div className="desk">
      <PageHead kicker="RECORDS" title="Certificates" text="Completed events on this account can issue a participation certificate." />
      {ready.length === 0 && <p className="empty">No completed events yet.</p>}
      <div className="event-grid">
        {ready.map((row) => (
          <article key={row.id} className="event-card">
            <p className="widget__label">Participation</p>
            <h2>{row.title}</h2>
            <p>{user?.fullName}</p>
            <button type="button" className="btn btn--ink" onClick={() => printCert(row)}>Preview / print</button>
          </article>
        ))}
      </div>
    </div>
  )
}

export function DigitalCard() {
  useTitle('Digital Card')
  const { user } = useStudent()
  const stamp = (user?.email || 'student').slice(0, 8).toUpperCase()
  return (
    <div className="desk">
      <PageHead kicker="IDENTITY" title="Digital card" text="A local identity strip for check-in. It never leaves this browser." />
      <article className="id-card">
        <div>
          <p>CAMPUSCODE</p>
          <h2>{user?.fullName}</h2>
          <p>{user?.college || 'Student'}{user?.city ? ` · ${user.city}` : ''}</p>
        </div>
        <div>
          <span>{stamp}</span>
          <small>{user?.email}</small>
        </div>
      </article>
    </div>
  )
}

export function RuleBot() {
  useTitle('RuleBot AI')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    const q = question.toLowerCase()
    const guide = GUIDE_SECTIONS.find((section) => q.includes(section.id) || section.title.toLowerCase().split(' ').some((word) => word.length > 4 && q.includes(word)))
    const rule = RULES.find((line) => line.toLowerCase().split(' ').some((word) => word.length > 5 && q.includes(word.replace(/[’']/g, ''))))
    if (/invite|paid|code|unstop/.test(q)) setAnswer(`Paid events ask for an invite code. For this demo the code is ${PAID_INVITE_CODE}.`)
    else if (/certificate/.test(q)) setAnswer(GUIDE_SECTIONS.find((section) => section.id === 'certs').body)
    else if (guide) setAnswer(guide.body)
    else if (rule) setAnswer(rule)
    else setAnswer('I can answer from the student guide and hackathon rules. Try asking about events, certificates, invite codes, or getting started.')
  }

  return (
    <div className="desk desk--narrow">
      <PageHead kicker="WORKSPACE TOOL" title="RuleBot AI" text="Answers workspace rules from the student guide. Nothing is sent off this page." />
      <form className="tool-form" onSubmit={onSubmit}>
        <label>Question<input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="How do invite codes work?" required /></label>
        <button className="btn btn--ink" type="submit">Ask</button>
      </form>
      {answer && <article className="result"><p>{answer}</p></article>}
    </div>
  )
}

export function Guide() {
  useTitle('Student Guide')
  return (
    <div className="desk desk--narrow">
      <PageHead kicker="GUIDE" title="Student guide" text="How this workspace is meant to be used." />
      <div className="stack">
        {GUIDE_SECTIONS.map((section) => (
          <article key={section.id} className="record">
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function Communication() {
  useTitle('Official Communication')
  return (
    <div className="desk desk--narrow">
      <PageHead kicker="FROM CAMPUSCODE" title="Official communication" text="Important notices stay pinned. The demo invite code is CC2026." />
      <div className="stack">
        {OFFICIAL_NOTES.map((note) => (
          <article key={note.id} className="record">
            <p className="widget__label">{note.important ? 'Pinned' : 'Note'} · {note.date}</p>
            <h2>{note.title}</h2>
            <p>{note.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function Notifications() {
  useTitle('Notifications')
  const key = 'campuscode_notes_read'
  const [items, setItems] = useState(() => {
    const read = JSON.parse(localStorage.getItem(key) || '[]')
    return DEFAULT_NOTIFICATIONS.map((item) => ({ ...item, unread: item.unread && !read.includes(item.id) }))
  })

  function mark(id) {
    const read = JSON.parse(localStorage.getItem(key) || '[]')
    localStorage.setItem(key, JSON.stringify([...new Set([...read, id])]))
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)))
  }

  return (
    <div className="desk desk--narrow">
      <PageHead kicker="ACTIVITY" title="Notifications" text="A short feed for this account." />
      <div className="stack">
        {items.map((item) => (
          <article key={item.id} className="record">
            <p className="widget__label">{item.unread ? 'Unread' : 'Read'} · {item.time}</p>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            {item.unread && <button type="button" className="btn btn--ghost" onClick={() => mark(item.id)}>Mark read</button>}
          </article>
        ))}
      </div>
    </div>
  )
}

export function Help() {
  useTitle('Help & Support')
  const [open, setOpen] = useState(0)
  return (
    <div className="desk desk--narrow">
      <PageHead kicker="SUPPORT" title="Help & support" text="Same answers as the public support page, next to your events." />
      <div className="accordion">
        {HELP_TOPICS.map((item, index) => (
          <article key={item.q}>
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>{item.q}</button>
            {open === index && <p>{item.a}</p>}
          </article>
        ))}
      </div>
      <p>Still stuck? Write to <a href="mailto:campuscode@gmail.com">campuscode@gmail.com</a>.</p>
    </div>
  )
}

export function Profile() {
  useTitle('Profile')
  const { user, saveProfile } = useStudent()
  const [form, setForm] = useState({
    fullName: user?.fullName || '',
    college: user?.college || '',
    city: user?.city || '',
  })
  const [saved, setSaved] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    saveProfile(form)
    setSaved(true)
  }

  return (
    <div className="desk desk--narrow">
      <PageHead kicker="ACCOUNT" title="Profile" text="Name and campus details stay on this device." />
      <form className="tool-form" onSubmit={onSubmit}>
        <label>Full name<input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required /></label>
        <label>Email<input value={user?.email || ''} readOnly /></label>
        <label>College<input value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} placeholder="Your college" /></label>
        <label>City<input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" /></label>
        <button className="btn btn--ink" type="submit">Save profile</button>
        {saved && <p className="form-note">Profile saved on this browser.</p>}
      </form>
    </div>
  )
}
