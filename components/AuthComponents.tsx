import { login, logout } from "app/actions/authActions" // ✅ Import server actions
import { Button } from "components/ui/Button"

export function SignIn({ provider }: { provider: string }) {
  return (
    <form action={async () => await login(provider)}>
      <Button type="submit" className="rounded-lg border px-4 py-2 text-blue-500 hover:bg-blue-100">
        Log In
      </Button>
    </form>
  )
}

export function SignOut({ provider }: { provider: string }) {
  return (
    <form action={async () => await logout()}>
      <Button variant="ghost" className="w-full p-0">
        Sign Out
      </Button>
    </form>
  )
}
