const USERS_KEY = 'campuscode_users'
const CURRENT_USER_KEY = 'campuscode_current_user'

const DEMO_USER = {
  fullName: 'CampusCode Student',
  email: 'student@gmail.com',
  password: 'Student@123',
  accountType: 'student',
}

export function getUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const users = Array.isArray(saved) ? saved : []
    if (!users.some((user) => user.email?.toLowerCase() === DEMO_USER.email)) {
      users.push(DEMO_USER)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    }
    return users
  } catch {
    localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]))
    return [DEMO_USER]
  }
}

export function registerUser(user) {
  const users = getUsers()
  const email = user.email.trim().toLowerCase()
  if (users.some((item) => item.email.toLowerCase() === email)) {
    return { ok: false, message: 'An account with this email already exists. Please login.' }
  }
  users.push({
    fullName: user.fullName.trim(),
    email,
    password: user.password,
    accountType: user.accountType || 'student',
  })
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return { ok: true, message: 'Registration successful!' }
}

export function loginUser(email, password) {
  const user = getUsers().find(
    (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password,
  )
  if (!user) return null
  const current = { fullName: user.fullName, email: user.email, accountType: user.accountType || 'student' }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(current))
  return current
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null')
  } catch {
    return null
  }
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

export function updateProfile(patch) {
  const current = getCurrentUser()
  if (!current) return null
  const users = getUsers()
  const index = users.findIndex((item) => item.email.toLowerCase() === current.email.toLowerCase())
  if (index >= 0) {
    users[index] = {
      ...users[index],
      fullName: patch.fullName?.trim() || users[index].fullName,
      college: patch.college?.trim() || '',
      city: patch.city?.trim() || '',
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }
  const next = {
    ...current,
    fullName: patch.fullName?.trim() || current.fullName,
    college: patch.college?.trim() || '',
    city: patch.city?.trim() || '',
  }
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(next))
  return next
}

export function resetPassword(email, password) {
  const users = getUsers()
  const index = users.findIndex((item) => item.email.toLowerCase() === email.trim().toLowerCase())
  if (index < 0) return { ok: false, message: 'No account uses that email.' }
  users[index] = { ...users[index], password }
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return { ok: true, message: 'Password updated. You can login now.' }
}
