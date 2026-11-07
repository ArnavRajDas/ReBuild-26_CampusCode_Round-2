import { Navigate, Route, Routes } from 'react-router-dom'
import { getCurrentUser } from './lib/auth.js'
import { Login, Register } from './pages/AuthPages.jsx'
import { Contact, Faq, Privacy, Rules, Support, Terms } from './pages/InfoPages.jsx'
import Landing from './pages/Landing.jsx'
import StudentShell from './pages/student/Shell.jsx'
import {
  Certificates,
  Communication,
  DigitalCard,
  Events,
  Guide,
  HackMate,
  Help,
  IdeaCheck,
  MyEvents,
  Notifications,
  Overview,
  Profile,
  RuleBot,
} from './pages/student/Pages.jsx'

function RequireAuth() {
  if (!getCurrentUser()) return <Navigate to="/login" replace />
  return <StudentShell />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/student" element={<RequireAuth />}>
        <Route index element={<Overview />} />
        <Route path="events" element={<Events />} />
        <Route path="my-events" element={<MyEvents />} />
        <Route path="hackmate" element={<HackMate />} />
        <Route path="ideacheck" element={<IdeaCheck />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="digital-card" element={<DigitalCard />} />
        <Route path="rulebot" element={<RuleBot />} />
        <Route path="guide" element={<Guide />} />
        <Route path="communication" element={<Communication />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="help" element={<Help />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
