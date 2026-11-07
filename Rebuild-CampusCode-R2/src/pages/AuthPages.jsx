import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthShell } from '../components/Chrome.jsx'
import { LOGIN_CARDS, REGISTER_CARDS } from '../data/content.js'
import { loginUser, registerUser, resetPassword } from '../lib/auth.js'

function freshCaptcha() {
  return Array.from({ length: 5 }, () => String(Math.floor(Math.random() * 10))).join('')
}

function useCaptcha() {
  const [code, setCode] = useState(freshCaptcha)
  return { code, refresh: () => setCode(freshCaptcha()) }
}

function PasswordField({ id, label, placeholder, autoComplete, value, onChange }) {
  const [shown, setShown] = useState(false)
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <span className="field__box">
        <input
          id={id}
          name={id}
          type={shown ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          required
        />
        <button type="button" className="field__toggle" onClick={() => setShown((open) => !open)}>
          {shown ? 'HIDE' : 'SHOW'}
        </button>
      </span>
    </label>
  )
}

function CaptchaField({ code, onRefresh, value, onChange }) {
  return (
    <div className="field">
      <span id="captcha-label">CAPTCHA</span>
      <div className="captcha">
        <p aria-label={`Captcha code ${code.split('').join(' ')}`}>{code}</p>
        <button type="button" onClick={onRefresh}>↻ NEW</button>
      </div>
      <span className="field__box">
        <input
          id="captcha-code"
          value={value}
          onChange={onChange}
          placeholder="Enter the code above"
          aria-labelledby="captcha-label"
          autoComplete="off"
          required
        />
      </span>
    </div>
  )
}

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const captcha = useCaptcha()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [riding, setRiding] = useState(false)
  const [forgot, setForgot] = useState(false)

  useEffect(() => { document.title = 'Login — CampusCode' }, [])

  function onSubmit(event) {
    event.preventDefault()
    if (riding) return
    if (code.trim() !== captcha.code) {
      setError('Incorrect CAPTCHA.')
      captcha.refresh()
      setCode('')
      return
    }
    const user = loginUser(email, password)
    if (!user) {
      setError('Invalid email or password.')
      return
    }
    setError('')
    setRiding(true)
    window.setTimeout(() => navigate('/student'), 900)
  }

  return (
    <AuthShell>
      <div className="auth-grid">
        <section className="auth-hero">
          <p className="kicker">CAMPUSCODE / AUTHENTICATION</p>
          <p className="auth-hero__step">ACCESS · 01 / 02</p>
          <h1>ENTER<br />THE<br />ARENA.</h1>
          <p>Sign in to continue building, collaborating and competing with the CampusCode community.</p>
          <ul className="auth-cards">
            {LOGIN_CARDS.map((card) => (
              <li key={card.no}><span>{card.no}</span><strong>{card.title}</strong></li>
            ))}
          </ul>
          <p className="auth-hero__foot">ACCESS YOUR ACCOUNT · AUTHENTICATION READY · SECURE ACCESS · 2026</p>
        </section>
        <section className="auth-card" aria-labelledby="login-title">
          <p className="kicker">EXISTING ACCOUNT · CC 01</p>
          <h2 id="login-title">LOGIN</h2>
          <p className="auth-card__sub">Access your CampusCode account.</p>
          {location.state?.registered && <p className="form-note">Registration successful. Sign in to enter the arena.</p>}
          <form onSubmit={onSubmit} noValidate={false}>
            <label className="field" htmlFor="email">
              <span>EMAIL ADDRESS</span>
              <span className="field__box">
                <input id="email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </span>
            </label>
            <PasswordField id="password" label="PASSWORD" placeholder="Enter your password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <CaptchaField code={captcha.code} onRefresh={captcha.refresh} value={code} onChange={(e) => setCode(e.target.value)} />
            {error && <p className="form-error" role="alert">{error}</p>}
            <div className={`security${riding ? ' is-on' : ''}`} aria-live="polite">
              <span>{riding ? 'OPENING THE ARENA' : 'READY'}</span>
              <i />
            </div>
            <button className="btn btn--ink btn--wide" type="submit" disabled={riding}>
              LOGIN <span aria-hidden="true">↗</span>
            </button>
          </form>
          <div className="auth-card__links">
            <button type="button" className="text-link" onClick={() => setForgot(true)}>FORGOT PASSWORD?</button>
            <p>DON'T HAVE AN ACCOUNT? <Link to="/register">CREATE ACCOUNT →</Link></p>
          </div>
          <p className="demo-note">Demo student · student@gmail.com · Student@123</p>
          <p className="auth-card__status"><i /> SECURE LOGIN · AUTH / 2026</p>
          {forgot && (
            <ForgotPassword onClose={() => setForgot(false)} />
          )}
        </section>
      </div>
    </AuthShell>
  )
}

function ForgotPassword({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  function onSubmit(event) {
    event.preventDefault()
    if (password.length < 8) {
      setMessage('Use at least 8 characters.')
      return
    }
    setMessage(resetPassword(email, password).message)
  }

  return (
    <div className="sheet" role="dialog" aria-labelledby="forgot-title">
      <form className="sheet__card" onSubmit={onSubmit}>
        <p className="kicker">ACCOUNT RECOVERY</p>
        <h3 id="forgot-title">Set a new password</h3>
        <p>This demo keeps accounts in the browser, so the reset happens here instead of by email.</p>
        <label className="field">
          <span>EMAIL ADDRESS</span>
          <span className="field__box"><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" /></span>
        </label>
        <label className="field">
          <span>NEW PASSWORD</span>
          <span className="field__box"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} placeholder="At least 8 characters" /></span>
        </label>
        {message && <p className="form-note">{message}</p>}
        <div className="sheet__actions">
          <button className="btn btn--ink" type="submit">UPDATE PASSWORD</button>
          <button className="btn btn--ghost" type="button" onClick={onClose}>CLOSE</button>
        </div>
      </form>
    </div>
  )
}

export function Register() {
  const navigate = useNavigate()
  const captcha = useCaptcha()
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirm: '', captcha: '', age: false,
  })
  const [error, setError] = useState('')
  const [phase, setPhase] = useState('form')
  const [verify, setVerify] = useState('')
  const [typed, setTyped] = useState('')
  const issued = useMemo(() => verify, [verify])

  useEffect(() => { document.title = 'Register — CampusCode' }, [])

  function setField(key) {
    return (event) => {
      const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
      setForm((prev) => ({ ...prev, [key]: value }))
    }
  }

  function onSubmit(event) {
    event.preventDefault()
    if (!form.fullName.trim() || !form.email.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (form.password.length < 8) {
      setError('Password should be at least 8 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.captcha.trim() !== captcha.code) {
      setError('Incorrect CAPTCHA.')
      captcha.refresh()
      setForm((prev) => ({ ...prev, captcha: '' }))
      return
    }
    if (!form.age) {
      setError('Please confirm that you are 18 years of age or older.')
      return
    }
    const code = String(Math.floor(100000 + Math.random() * 900000))
    setVerify(code)
    setTyped('')
    setError('')
    setPhase('verify')
  }

  function confirmCode(event) {
    event.preventDefault()
    if (typed.trim() !== issued) {
      setError('That verification code does not match.')
      return
    }
    const result = registerUser({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      accountType: 'student',
    })
    if (!result.ok) {
      setError(result.message)
      setPhase('form')
      return
    }
    navigate('/login', { state: { registered: true } })
  }

  return (
    <AuthShell>
      <div className="auth-grid">
        <section className="auth-hero">
          <p className="kicker">CAMPUSCODE / REGISTRATION</p>
          <p className="auth-hero__step">CREATE · 02 / 02</p>
          <h1>JOIN<br />THE<br />ARENA.</h1>
          <p>Create your CampusCode identity and become part of a student ecosystem designed around ideas, teams, technology and competition.</p>
          <ul className="auth-cards auth-cards--rich">
            {REGISTER_CARDS.map((card) => (
              <li key={card.no}>
                <span>{card.no} · {card.meta}</span>
                <strong>{card.title}</strong>
                <p>{card.text}</p>
              </li>
            ))}
          </ul>
          <p className="auth-hero__foot">REGISTRATION OPEN · STUDENT INNOVATION NETWORK · 2026</p>
        </section>
        <section className="auth-card" aria-labelledby="register-title">
          <p className="kicker">NEW ACCOUNT · CC 02</p>
          <h2 id="register-title">REGISTER</h2>
          <p className="auth-card__sub">Create your CampusCode account.</p>
          {phase === 'form' ? (
            <form onSubmit={onSubmit}>
              <label className="field" htmlFor="full-name">
                <span>FULL NAME</span>
                <span className="field__box"><input id="full-name" placeholder="Your full name" autoComplete="name" value={form.fullName} onChange={setField('fullName')} required /></span>
              </label>
              <label className="field" htmlFor="reg-email">
                <span>EMAIL ADDRESS</span>
                <span className="field__box"><input id="reg-email" type="email" placeholder="you@example.com" autoComplete="email" value={form.email} onChange={setField('email')} required /></span>
              </label>
              <label className="field" htmlFor="account-type">
                <span>ACCOUNT TYPE</span>
                <span className="field__box"><input id="account-type" value="STUDENT" readOnly /></span>
                <small>Organizer? Accounts are created by our team — contact <a href="mailto:campuscode@gmail.com">campuscode@gmail.com</a></small>
              </label>
              <PasswordField id="reg-password" label="PASSWORD" placeholder="Create a password" autoComplete="new-password" value={form.password} onChange={setField('password')} />
              <PasswordField id="confirm-password" label="CONFIRM PASSWORD" placeholder="Repeat your password" autoComplete="new-password" value={form.confirm} onChange={setField('confirm')} />
              <CaptchaField code={captcha.code} onRefresh={captcha.refresh} value={form.captcha} onChange={setField('captcha')} />
              <label className="check">
                <input type="checkbox" checked={form.age} onChange={setField('age')} />
                <span>I confirm that I am <strong>18 years of age or older</strong>.</span>
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="btn btn--ink btn--wide" type="submit">SEND VERIFICATION CODE <span aria-hidden="true">↗</span></button>
            </form>
          ) : (
            <form onSubmit={confirmCode}>
              <p className="form-note">Verification code for this demo (no inbox is connected): <strong>{issued}</strong></p>
              <label className="field">
                <span>VERIFICATION CODE</span>
                <span className="field__box"><input value={typed} onChange={(e) => setTyped(e.target.value)} inputMode="numeric" placeholder="6-digit code" required /></span>
              </label>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="btn btn--ink btn--wide" type="submit">CREATE ACCOUNT <span aria-hidden="true">↗</span></button>
              <button className="btn btn--ghost btn--wide" type="button" onClick={() => setPhase('form')}>EDIT DETAILS</button>
            </form>
          )}
          <p className="auth-card__links">ALREADY HAVE AN ACCOUNT? <Link to="/login">LOGIN →</Link></p>
          <p className="auth-card__status"><i /> SECURE REGISTRATION · AUTH / 2026</p>
        </section>
      </div>
    </AuthShell>
  )
}
