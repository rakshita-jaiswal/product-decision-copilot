import { writable } from 'svelte/store'

type User = { name: string; email: string } | null
type StoredUser = { name: string; email: string; password: string }

const USERS_KEY = 'pdc_users'
const SESSION_KEY = 'pdc_session'

function loadUsers(): Record<string, StoredUser> {
  try {
    if (typeof window === 'undefined') return {}
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) as Record<string, StoredUser> : {}
  } catch (e) {
    return {}
  }
}

function saveUsers(users: Record<string, StoredUser>) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch (e) {}
}

function setSession(email: string) {
  try {
    if (typeof window === 'undefined') return
    localStorage.setItem(SESSION_KEY, email)
  } catch (e) {}
}

function clearSession() {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(SESSION_KEY)
  } catch (e) {}
}

function createAppState() {
  let initial = {
    isAuthenticated: false,
    hasCompletedOnboarding: false,
    user: null as User,
    currentStep: 0,
  }

  // hydrate from session if available (client-only)
  try {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem(SESSION_KEY)
      const users = loadUsers()
      if (session && users[session]) {
        initial.isAuthenticated = true
        initial.user = { name: users[session].name, email: session }
      }
    }
  } catch (e) {}

  const { subscribe, set, update } = writable(initial)

  return {
    subscribe,
    register(email: string, name: string, password: string) {
      const users = loadUsers()
      if (users[email]) {
        return { success: false, message: 'User already exists' }
      }
      // store password in base64 (not secure, but fine for demo)
      users[email] = { email, name, password: btoa(password) }
      saveUsers(users)
      setSession(email)
      update(() => ({ isAuthenticated: true, hasCompletedOnboarding: false, user: { email, name }, currentStep: 0 }))
      return { success: true }
    },
    login(email: string, password: string) {
      const users = loadUsers()
      const stored = users[email]
      if (!stored) {
        return { success: false, message: 'No account found for this email' }
      }
      if (stored.password !== btoa(password)) {
        return { success: false, message: 'Invalid password' }
      }
      setSession(email)
      update(() => ({ isAuthenticated: true, hasCompletedOnboarding: false, user: { email, name: stored.name }, currentStep: 0 }))
      return { success: true }
    },
    completeOnboarding() {
      update((s) => ({ ...s, hasCompletedOnboarding: true }))
    },
    logout() {
      clearSession()
      set({ isAuthenticated: false, hasCompletedOnboarding: false, user: null, currentStep: 0 })
    },
    setCurrentStep(n: number) {
      update((s) => ({ ...s, currentStep: n }))
    },
  }
}

export const appState = createAppState()

