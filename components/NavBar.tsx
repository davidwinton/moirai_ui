"use client"

import Link from "next/link"
import SearchComponent from "components/Search"
import Image from "next/image"
import UserButton from "components/UserButton"

interface Session {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function NavBar({ session }: { session: Session | null }) {
  return (
    <nav className="flex items-center justify-between bg-white p-4 shadow-md">
      <div className="flex items-center gap-6">
        <Image className="h-8 w-auto" src="/images/MoiraiLogo.png" alt="Logo" />
        <Link href="/company_list/1" className="text-gray-700 hover:underline">
          Moirai
        </Link>
        <Link href="/company_list/1" className="text-gray-700 hover:underline">
          Recommendations
        </Link>
        <Link href="/search" className="text-gray-700 hover:underline">
          Search
        </Link>
      </div>

      <div className="w-1/3">
        <SearchComponent />
      </div>

      <UserButton session={session} />
    </nav>
  )
}
