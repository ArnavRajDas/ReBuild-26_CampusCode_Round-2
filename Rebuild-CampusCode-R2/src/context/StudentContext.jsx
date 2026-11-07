import { createContext, useContext, useState } from 'react'
import { getCurrentUser, updateProfile } from '../lib/auth.js'
import { useDashboardPrefs, useEventStore } from '../lib/hooks.js'

const StudentContext = createContext(null)

export function StudentProvider({ children }) {
  const prefsApi = useDashboardPrefs()
  const eventsApi = useEventStore()
  const [user, setUser] = useState(() => getCurrentUser())

  function saveProfile(patch) {
    const next = updateProfile(patch)
    setUser(next)
    return next
  }

  return (
    <StudentContext.Provider value={{ user, saveProfile, ...prefsApi, ...eventsApi }}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudent() {
  const value = useContext(StudentContext)
  if (!value) throw new Error('useStudent must be used inside StudentProvider')
  return value
}
