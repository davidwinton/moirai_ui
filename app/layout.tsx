import "styles/tailwind.css"
import NavBar from "components/NavBar";
import {auth } from "auth"
import { SessionProvider } from "next-auth/react"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth(); // Fetch session from the server

  if (session?.user) {
    // TODO: Look into https://react.dev/reference/react/experimental_taintObjectReference
    // filter out sensitive data before passing to client.
    session.user = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  }


  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <SessionProvider session={session}>

        <NavBar session={session} />
        {session?.user ? <main>{children}</main> : null}
        </SessionProvider>
        </body>
    </html>
  )
}
