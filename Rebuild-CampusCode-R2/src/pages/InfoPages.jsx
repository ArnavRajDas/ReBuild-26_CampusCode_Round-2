import { useEffect, useState } from 'react'
import { InfoLayout } from '../components/Chrome.jsx'
import { FAQ, RULES } from '../data/content.js'

function useTitle(title) {
  useEffect(() => { document.title = `${title} — CampusCode` }, [title])
}

export function Rules() {
  useTitle('Hackathon rules')
  return (
    <InfoLayout kicker="GUIDES" title="Hackathon rules" lede="The working rules for CampusCode events in this arena.">
      <ol className="prose-list">{RULES.map((rule) => <li key={rule}>{rule}</li>)}</ol>
    </InfoLayout>
  )
}

export function Faq() {
  useTitle('FAQ')
  const [open, setOpen] = useState(0)
  return (
    <InfoLayout kicker="GUIDES" title="FAQ" lede="Short answers before you join the arena.">
      <div className="accordion">
        {FAQ.map((item, index) => (
          <article key={item.q}>
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
              {item.q}
            </button>
            {open === index && <p>{item.a}</p>}
          </article>
        ))}
      </div>
    </InfoLayout>
  )
}

export function Support() {
  useTitle('Support')
  return (
    <InfoLayout kicker="GUIDES" title="Support" lede="Students write to the CampusCode desk. Organizer seats are opened by the team.">
      <p>Email <a href="mailto:campuscode@gmail.com">campuscode@gmail.com</a> or use the contact form. Inside the workspace, Help & Support keeps the same answers next to your events.</p>
    </InfoLayout>
  )
}

export function Contact() {
  useTitle('Contact')
  const [sent, setSent] = useState(false)
  function onSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const existing = JSON.parse(localStorage.getItem('campuscode_messages') || '[]')
    existing.push({ ...data, at: new Date().toISOString() })
    localStorage.setItem('campuscode_messages', JSON.stringify(existing))
    setSent(true)
    event.currentTarget.reset()
  }
  return (
    <InfoLayout kicker="CHENNAI · INDIA" title="Contact" lede="The student hackathon arena. You build the idea, we run the competition.">
      <form className="contact-form" onSubmit={onSubmit}>
        <label>Name<input name="name" required placeholder="Your name" /></label>
        <label>Email<input name="email" type="email" required placeholder="you@example.com" /></label>
        <label>Message<textarea name="message" required rows={5} placeholder="What do you want to build?" /></label>
        <button className="btn btn--ink" type="submit">SEND MESSAGE</button>
        {sent && <p className="form-note">Message saved on this browser. We would route it to campuscode@gmail.com.</p>}
      </form>
    </InfoLayout>
  )
}

export function Terms() {
  useTitle('Terms')
  return (
    <InfoLayout kicker="LEGAL" title="Terms" lede="CampusCode is a student hackathon arena. This recreation is a frontend demo.">
      <p>Accounts, event registrations and messages stay in your browser. Do not submit passwords you use elsewhere. Organizer accounts are not self-serve. Event rules on the Hackathon Rules page govern participation in listed events.</p>
    </InfoLayout>
  )
}

export function Privacy() {
  useTitle('Privacy')
  return (
    <InfoLayout kicker="LEGAL" title="Privacy" lede="Nothing on this demo is sent to a CampusCode server.">
      <p>Registration, login, wishlist, dashboard layout, profile extras and contact notes are stored with localStorage on this device. Clearing site data removes them. AI helpers do not leave the page.</p>
    </InfoLayout>
  )
}
