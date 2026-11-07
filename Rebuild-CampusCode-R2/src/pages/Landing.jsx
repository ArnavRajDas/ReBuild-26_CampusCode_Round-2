import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SiteFooter, SiteHeader } from '../components/Chrome.jsx'
import { ABOUT_PILLARS, MARQUEE, PEOPLE, STEPS, STORY, TRACKS } from '../data/content.js'

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 0.7, 0.2, 1] } }),
}

export default function Landing() {
  const reduce = useReducedMotion()
  useEffect(() => {
    document.title = 'CampusCode'
    if (window.location.hash) {
      document.querySelector(window.location.hash)?.scrollIntoView()
    }
  }, [])

  return (
    <div className="landing">
      <SiteHeader />
      <Hero reduce={reduce} />
      <Marquee />
      <About reduce={reduce} />
      <Story />
      <How reduce={reduce} />
      <Arena reduce={reduce} />
      <Mission reduce={reduce} />
      <PeopleSection reduce={reduce} />
      <FinalCta reduce={reduce} />
      <SiteFooter />
    </div>
  )
}

function Hero({ reduce }) {
  return (
    <section className="hero" id="home">
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__meta">
        <p><span className="live-dot" /> THE DIGITAL HOME FOR STUDENT INNOVATION</p>
        <p>CHENNAI · INDIA</p>
      </div>
      <div className="hero__layout">
        <div>
          <p className="hero__index">CAMPUSCODE / 001</p>
          <h1 className="hero__title">
            {['BUILD', 'COMPETE', 'SHIP.'].map((word, index) => (
              <motion.span
                key={word}
                initial={reduce ? false : { opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08 + index * 0.12, ease: [0.22, 0.7, 0.2, 1] }}
                className={index === 1 ? 'is-italic' : undefined}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <div className="hero__bottom">
            <p>A digital arena for students who don't just have ideas. They build them.</p>
            <a className="btn btn--ink" href="#arena">
              EXPLORE HACKATHONS <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <motion.aside
          className="pass"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <div className="pass__top">
            <span>ARENA PASS</span>
            <span>2026</span>
          </div>
          <p className="pass__place">Chennai</p>
          <ul>
            {TRACKS.map((track) => (
              <li key={track.id}>
                <em>{track.status}</em>
                <strong>{track.title}</strong>
              </li>
            ))}
          </ul>
          <p className="pass__foot">Student hackathon arena · open registration</p>
        </motion.aside>
      </div>
    </section>
  )
}

function Marquee() {
  const line = [...MARQUEE, ...MARQUEE]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <p key={copy}>
            {line.map((word, index) => <span key={`${copy}-${word}-${index}`}>{word} <i>✦</i></span>)}
          </p>
        ))}
      </div>
    </div>
  )
}

function About({ reduce }) {
  return (
    <section className="band" id="about">
      <motion.div className="band__intro" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        <p className="kicker">01 — WHAT IS CAMPUSCODE?</p>
        <h2>WHERE STUDENTS BUILD.</h2>
        <p className="lede">CampusCode brings students, teams, organizers and hackathons into one connected ecosystem.</p>
      </motion.div>
      <div className="pillars">
        {ABOUT_PILLARS.map((item, index) => (
          <motion.article
            key={item.no}
            custom={reduce ? 0 : index * 0.08}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <span>{item.no}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Story() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const node = document.getElementById('experience')
      if (!node) return
      const rect = node.getBoundingClientRect()
      const total = node.offsetHeight - window.innerHeight
      const passed = Math.min(Math.max(-rect.top, 0), total)
      const index = Math.min(STORY.length - 1, Math.floor((passed / total) * STORY.length))
      setActive(Number.isFinite(index) ? index : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="story" id="experience">
      <div className="story__sticky">
        <div className="story__head">
          <p>02 — EXPERIENCE</p>
          <p>THE CAMPUSCODE EXPERIENCE</p>
          <p>00:30</p>
        </div>
        <h2>BUILD TOGETHER.</h2>
        <div className="story__stage">
          <div>
            <p className="story__kicker">{STORY[active].kicker} / 04</p>
            <h3 key={STORY[active].title}>{STORY[active].title}</h3>
            <p>{STORY[active].text}</p>
            <p className="story__hint">WATCH THE STORY · PLAYS AS YOU SCROLL ↗</p>
          </div>
          <ol>
            {STORY.map((frame, index) => (
              <li key={frame.kicker} className={index === active ? 'is-on' : index < active ? 'is-done' : ''}>
                <span>{frame.kicker}</span>
                {frame.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="story__bar" style={{ width: `${((active + 1) / STORY.length) * 100}%` }} />
      </div>
    </section>
  )
}

function How({ reduce }) {
  return (
    <section className="band how" id="how">
      <div className="how__head">
        <p className="kicker">03 — HOW IT WORKS</p>
        <h2>FROM IDEA TO IMPACT.</h2>
      </div>
      <ol className="steps">
        {STEPS.map((step, index) => (
          <motion.li
            key={step.no}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: index * 0.08 }}
          >
            <span>{step.no}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function Arena({ reduce }) {
  return (
    <section className="band arena" id="arena">
      <div className="how__head">
        <p className="kicker">04 — ENTER THE ARENA</p>
        <h2>ENTER THE ARENA</h2>
      </div>
      <div className="tracks">
        {TRACKS.map((track, index) => (
          <motion.div
            key={track.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.1 }}
          >
          <Link to="/register" className="track">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <em>{track.status}</em>
            <h3>{track.title}</h3>
            <p>{track.text}</p>
            <strong>Join this track ↗</strong>
          </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Mission({ reduce }) {
  return (
    <section className="mission">
      <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="kicker">05 — THE MISSION</p>
        <h2>GREAT IDEAS NEED BUILDERS.</h2>
        <p>Your university is full of people with ideas. CampusCode gives those ideas somewhere to go.</p>
      </motion.div>
    </section>
  )
}

function PeopleSection({ reduce }) {
  return (
    <section className="band people" id="community">
      <div>
        <p className="kicker">06 — COMMUNITY</p>
        <h2>FIND YOUR PEOPLE.</h2>
        <p className="lede">Build with developers. Think with designers. Compete with builders.</p>
      </div>
      <div className="people__cards">
        {PEOPLE.map((person, index) => (
          <motion.article
            key={person.title}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <span>0{index + 1}</span>
            <h3>{person.title}</h3>
            <p>{person.note}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function FinalCta({ reduce }) {
  return (
    <section className="final" id="join">
      <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="kicker">READY?</p>
        <h2>YOUR NEXT PROJECT STARTS HERE.</h2>
        <p>The student hackathon arena. You build the idea, we run the competition.</p>
        <Link className="btn btn--paper" to="/register">JOIN CAMPUSCODE <span aria-hidden="true">↗</span></Link>
      </motion.div>
    </section>
  )
}
