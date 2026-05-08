import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, '..', 'data')
const DATA_FILE = path.join(DATA_DIR, 'users.json')

export interface StoredUser {
  id: string
  username: string
  passwordHash: string
  createdAt: string
}

interface UserStore {
  users: StoredUser[]
}

function readStore(): UserStore {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as UserStore
  } catch {
    return { users: [] }
  }
}

function writeStore(store: UserStore): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8')
}

export function findByUsername(username: string): StoredUser | undefined {
  const store = readStore()
  return store.users.find((u) => u.username === username)
}

export function findById(id: string): StoredUser | undefined {
  const store = readStore()
  return store.users.find((u) => u.id === id)
}

export function createUser(username: string, passwordHash: string): StoredUser {
  const store = readStore()
  const user: StoredUser = {
    id: crypto.randomUUID(),
    username,
    passwordHash,
    createdAt: new Date().toISOString(),
  }
  store.users.push(user)
  writeStore(store)
  return user
}
