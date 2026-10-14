import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
const env = import.meta.env;
const firebaseConfig = { apiKey: env.VITE_FIREBASE_API_KEY, authDomain: env.VITE_FIREBASE_AUTH_DOMAIN, projectId: env.VITE_FIREBASE_PROJECT_ID, appId: env.VITE_FIREBASE_APP_ID };
const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId);
function auth() { return getAuth(getApps()[0] ?? initializeApp(firebaseConfig)); }
export type User = { email: string; name: string; role: string };
const key = 'pulse-city-user';
function clean(input: string) { return input.replace(/[<>\u0000-\u001f]/g, '').trim().slice(0, 120); }
export async function login(email: string, password: string): Promise<User> {
  if (configured) { const c = await signInWithEmailAndPassword(auth(), clean(email), password); return { email: c.user.email || email, name: c.user.displayName || 'City Operator', role: 'City Operator' }; }
  const attempts = Number(sessionStorage.getItem('pulse-attempts') || 0); if (attempts >= 5) throw new Error('Too many attempts. Try again in a minute.');
  if (!email.includes('@') || password.length < 6) { sessionStorage.setItem('pulse-attempts', String(attempts + 1)); throw new Error('Check your email and password, then try again.'); }
  const user = { email: clean(email), name: clean(email.split('@')[0] || 'Operator'), role: 'City Operator' }; sessionStorage.setItem(key, JSON.stringify(user)); sessionStorage.removeItem('pulse-attempts'); return user;
}
export async function signup(name: string, email: string, password: string, role: string): Promise<User> {
  if (configured) { const c = await createUserWithEmailAndPassword(auth(), clean(email), password); const user = { email: c.user.email || email, name: clean(name), role }; sessionStorage.setItem(key, JSON.stringify(user)); return user; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) throw new Error('Enter a valid email and a password of at least 8 characters.');
  const user = { email: clean(email), name: clean(name), role }; sessionStorage.setItem(key, JSON.stringify(user)); return user;
}
export async function googleLogin(): Promise<User> { if (configured) { const c = await signInWithPopup(auth(), new GoogleAuthProvider()); return { email: c.user.email || '', name: c.user.displayName || 'Operator', role: 'City Operator' }; } return { email: 'operator@pulse.city', name: 'Alex Morgan', role: 'City Operator' }; }
export async function logout() { if (configured) await signOut(auth()); sessionStorage.removeItem(key); }
export function currentUser(): User | null { try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch { return null; } }
