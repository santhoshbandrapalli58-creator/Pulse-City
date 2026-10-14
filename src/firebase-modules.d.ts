declare module 'firebase/app' {
  export interface FirebaseApp { name: string }
  export function getApps(): FirebaseApp[];
  export function initializeApp(config: Record<string, string | undefined>): FirebaseApp;
}

declare module 'firebase/auth' {
  import type { FirebaseApp } from 'firebase/app';
  export interface UserCredential { user: { email: string | null; displayName: string | null } }
  export interface Auth { app: FirebaseApp }
  export class GoogleAuthProvider {}
  export function getAuth(app?: FirebaseApp): Auth;
  export function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
  export function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
  export function signInWithPopup(auth: Auth, provider: GoogleAuthProvider): Promise<UserCredential>;
  export function signOut(auth: Auth): Promise<void>;
}
