"use server" // ✅ This ensures it's a Server Component

import { signIn, signOut } from "auth"

// Server Action for signing in
export async function login(provider: string) {
  await signIn(provider)
}

// Server Action for signing out
export async function logout() {
  await signOut()
}
