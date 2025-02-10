"use client"; // ✅ This makes NavBar a Client Component

import Link from "next/link";
import UserButton from "components/UserButton"; // ✅ Import UserButton
import SearchComponent from "components/Search";

interface Session {
    user?: {
        name?: string | null;
        email?: string| null;
        image?: string| null;
    };
}

export default function NavBar({ session }: { session: Session | null }) {
    return (
        <nav className="flex items-center justify-between p-4 shadow-md bg-white">
            {/* Left - Logo & Navigation */}
            <div className="flex items-center gap-6">
                <img className="h-8 w-auto" src="/images/MoiraiLogo.png" alt="Logo" />
                <Link href="/company_list/1" className="text-gray-700 hover:underline">Moirai</Link>
                <Link href="/company_list/1" className="text-gray-700 hover:underline">Recommendations</Link>
                <Link href="/search" className="text-gray-700 hover:underline">Search</Link>
            </div>

            {/* Center - Search Bar */}
            <div className="w-1/3">
                <SearchComponent />
            </div>

            {/* Right - User Button */}
            <UserButton session={session} /> {/* ✅ Pass session to UserButton */}
        </nav>
    );
}
