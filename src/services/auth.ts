import { initializeApp, getApps } from 'firebase/app';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const env = import.meta.env;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};
const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId);
const userKey = 'pulse-city-user';
const attemptsKey = 'pulse-city-login-attempts';
const attemptWindowMs = 60_000;

export type User = { email: string; name: string; role: string };

function auth() {
  return getAuth(getApps()[0] ?? initializeApp(firebaseConfig));
}

function clean(input: string) {
  return input.replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, 120);
}

function saveUser(user: User, remember: boolean) {
  const destination = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;
  destination.setItem(userKey, JSON.stringify(user));
  other.removeItem(userKey);
}

function getDemoAttempts() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(attemptsKey) || 'null') as { count: number; startedAt: number } | null;
    if (!saved || Date.now() - saved.startedAt >= attemptWindowMs) return { count: 0, startedAt: Date.now() };
    return saved;
  } catch {
    return { count: 0, startedAt: Date.now() };
  }
}

export async function login(email: string, password: string, remember = true): Promise<User> {
  if (configured) {
    const client = auth();
    await setPersistence(client, remember ? browserLocalPersistence : browserSessionPersistence);
    const credential = await signInWithEmailAndPassword(client, clean(email), password);
    const user = { email: credential.user.email || clean(email), name: credential.user.displayName || 'City Operator', role: 'City Operator' };
    saveUser(user, remember);
    return user;
  }

  const attempts = getDemoAttempts();
  if (attempts.count >= 5) throw new Error('Too many attempts. Wait one minute, then try again.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 6) {
    sessionStorage.setItem(attemptsKey, JSON.stringify({ ...attempts, count: attempts.count + 1 }));
    throw new Error('Check your email and password, then try again.');
  }

  const user = { email: clean(email), name: clean(email.split('@')[0] || 'Operator'), role: 'City Operator' };
  saveUser(user, remember);
  sessionStorage.removeItem(attemptsKey);
  return user;
}

export async function signup(name: string, email: string, password: string, role: string): Promise<User> {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
    throw new Error('Enter a valid email and a password of at least 8 characters.');
  }

  if (configured) {
    const credential = await createUserWithEmailAndPassword(auth(), clean(email), password);
    const user = { email: credential.user.email || clean(email), name: clean(name), role };
    saveUser(user, true);
    return user;
  }

  const user = { email: clean(email), name: clean(name), role };
  saveUser(user, false);
  return user;
}

export async function googleLogin(): Promise<User> {
  if (configured) {
    const credential = await signInWithPopup(auth(), new GoogleAuthProvider());
    const user = { email: credential.user.email || '', name: credential.user.displayName || 'Operator', role: 'City Operator' };
    saveUser(user, true);
    return user;
  }

  const user = { email: 'operator@pulse.city', name: 'Alex Morgan', role: 'City Operator' };
  saveUser(user, false);
  return user;
}

export async function logout() {
  if (configured) await signOut(auth());
  sessionStorage.removeItem(userKey);
  localStorage.removeItem(userKey);
}

export function currentUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem(userKey) || sessionStorage.getItem(userKey) || 'null');
  } catch {
    return null;
  }
}
