import crypto from 'crypto'
import { storage, User } from './db'

export function validateEmail(email: string) {
  if (!email) {
    return 'Email is required.'
  } else if (!email.includes('@')) {
    return 'Please enter a valid email address.'
  }
}

export function validatePassword(password: string) {
  if (!password) {
    return 'Password is required.'
  } else if (password.length < 6) {
    return 'Password must be at least 6 characters.'
  }
}

export const getUserByEmail = async (email: string) => {
  return ((await storage.getItem('user:data')) as User[]).find(
    (user) => user.email === email
  )
}

export async function login(email: string, password: string) {
  let user = await getUserByEmail(email)

  if (!user || !user.password) {
    throw new Error('Account not found!')
  }

  let hash = crypto
    .pbkdf2Sync(password, user.password.salt, 1000, 64, 'sha256')
    .toString('hex')

  if (hash !== user.password.hash) {
    throw new Error('Invalid password')
  }
  return user
}

export async function accountExists(email: string) {
  const account = await getUserByEmail(email)

  return Boolean(account)
}

export async function register(email: string, password: string) {
  const userExists = await accountExists(email)
  if (userExists) throw new Error('User already exists')

  let salt = crypto.randomBytes(16).toString('hex')
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha256')
    .toString('hex')

  let [{ value: users }] = await storage.getItems(['user:data'])

  let user: User = { email, password: { hash, salt } }
  await Promise.all([
    storage.setItem('user:data', [...(users as User[]), user]),
  ])

  return user
}
