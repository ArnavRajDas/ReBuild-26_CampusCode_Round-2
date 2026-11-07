import { useCallback, useMemo, useRef, useState } from 'react'
import { EVENTS, MY_EVENT_SEED, WIDGETS } from '../data/content.js'
import { getCurrentUser } from './auth.js'

function who() {
  return getCurrentUser()?.email?.toLowerCase() || 'guest'
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null')
    return value ?? fallback
  } catch {
    return fallback
  }
}

const DEFAULT_TASKS = [
  { id: 't1', label: 'Register for FirstCommit Quiz 2.0', done: false, when: 'Today' },
  { id: 't2', label: 'Submit ReBuild ’26 round work', done: false, when: 'Today' },
  { id: 't3', label: 'Update digital card', done: true, when: 'This week' },
  { id: 't4', label: 'Upload latest certificate', done: false, when: 'This week' },
]

export function useEventStore() {
  const joinedKey = `campuscode_joined_events_${who()}`
  const wishKey = `campuscode_wishlist_${who()}`
  const taskKey = `campuscode_tasks_${who()}`

  const [joined, setJoined] = useState(() => {
    const stored = readJson(joinedKey, null)
    return Array.isArray(stored) ? stored : MY_EVENT_SEED
  })
  const [wishlist, setWishlist] = useState(() => readJson(wishKey, []))
  const [tasks, setTasks] = useState(() => readJson(taskKey, DEFAULT_TASKS))

  const isJoined = useCallback((eventId) => joined.some((row) => row.eventId === eventId), [joined])
  const isWished = useCallback((eventId) => wishlist.includes(eventId), [wishlist])

  const register = useCallback((eventId, teamName) => {
    setJoined((prev) => {
      if (prev.some((row) => row.eventId === eventId)) return prev
      const seed = MY_EVENT_SEED.find((row) => row.eventId === eventId)
      const next = [
        ...prev,
        seed || {
          eventId,
          registration: crypto.randomUUID(),
          team: teamName?.trim() || 'NOT ASSIGNED',
          teamIsName: Boolean(teamName?.trim()),
        },
      ]
      localStorage.setItem(joinedKey, JSON.stringify(next))
      return next
    })
  }, [joinedKey])

  const toggleWish = useCallback((eventId) => {
    setWishlist((prev) => {
      const next = prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
      localStorage.setItem(wishKey, JSON.stringify(next))
      return next
    })
  }, [wishKey])

  const toggleTask = useCallback((taskId) => {
    setTasks((prev) => {
      const next = prev.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task))
      localStorage.setItem(taskKey, JSON.stringify(next))
      return next
    })
  }, [taskKey])

  const records = useMemo(() => {
    const byId = Object.fromEntries(EVENTS.map((event) => [event.id, event]))
    return joined.map((row) => (byId[row.eventId] ? { ...byId[row.eventId], ...row } : null)).filter(Boolean)
  }, [joined])

  return { joined, wishlist, tasks, records, isJoined, isWished, register, toggleWish, toggleTask }
}

const DEFAULT_PREFS = {
  order: WIDGETS.map((widget) => widget.id),
  hidden: [],
  layoutStyle: 'default',
  appearance: 'balanced',
}

function normalizePrefs(raw) {
  const saved = raw && typeof raw === 'object' ? raw : {}
  const known = new Set(WIDGETS.map((widget) => widget.id))
  const savedOrder = Array.isArray(saved.order) ? saved.order.filter((id) => known.has(id)) : []
  const missing = WIDGETS.map((widget) => widget.id).filter((id) => !savedOrder.includes(id))
  return {
    order: [...savedOrder, ...missing],
    hidden: Array.isArray(saved.hidden) ? saved.hidden.filter((id) => known.has(id)) : [],
    layoutStyle: ['default', 'compact', 'minimal'].includes(saved.layoutStyle) ? saved.layoutStyle : 'default',
    appearance: ['balanced', 'terra', 'pine'].includes(saved.appearance) ? saved.appearance : 'balanced',
  }
}

export function useDashboardPrefs() {
  const key = `campuscode_dashboard_prefs_${who()}`
  const [saved, setSaved] = useState(() => normalizePrefs(readJson(key, DEFAULT_PREFS)))
  const [draft, setDraft] = useState(saved)
  const [panelOpen, setPanelOpen] = useState(false)
  const snapshotRef = useRef(null)

  const commit = useCallback((next) => {
    const normalized = normalizePrefs(next)
    localStorage.setItem(key, JSON.stringify(normalized))
    setSaved(normalized)
    setDraft(normalized)
  }, [key])

  const openPanel = () => {
    snapshotRef.current = normalizePrefs(saved)
    setDraft(saved)
    setPanelOpen(true)
  }

  const closePanel = (revert = false) => {
    if (revert && snapshotRef.current) commit(snapshotRef.current)
    setPanelOpen(false)
  }

  const move = (id, direction) => {
    setDraft((prev) => {
      const order = [...prev.order]
      const index = order.indexOf(id)
      const swap = index + direction
      if (index < 0 || swap < 0 || swap >= order.length) return prev
      ;[order[index], order[swap]] = [order[swap], order[index]]
      const next = { ...prev, order }
      commit(next)
      return next
    })
  }

  const toggleHidden = (id) => {
    setDraft((prev) => {
      const hidden = prev.hidden.includes(id) ? prev.hidden.filter((item) => item !== id) : [...prev.hidden, id]
      const next = { ...prev, hidden }
      commit(next)
      return next
    })
  }

  const setLayout = (layoutStyle) => {
    const next = { ...draft, layoutStyle }
    setDraft(next)
    commit(next)
  }

  const setAppearance = (appearance) => {
    const next = { ...draft, appearance }
    setDraft(next)
    commit(next)
  }

  const reset = () => commit(DEFAULT_PREFS)

  return {
    prefs: saved,
    draft,
    panelOpen,
    openPanel,
    closePanel,
    move,
    toggleHidden,
    setLayout,
    setAppearance,
    reset,
  }
}
