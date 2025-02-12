import { SignIn, SignOut } from "components/AuthComponents"
import { Avatar, AvatarImage } from "components/ui/Avatar"
import { Button } from "components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "components/ui/DropDownMenu"
import { Session } from "types/types"

export default function UserButton({ session }: { session: Session | null }) {
  if (!session?.user) return <SignIn provider="google" />
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm sm:inline-flex">{session.user.email}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative size-8 rounded-full">
            <Avatar className="size-8">
              <AvatarImage
                src={
                  session.user.image ??
                  `https://api.dicebear.com/9.x/thumbs/svg?seed=${
                    Math.floor(Math.random() * 100000) + 1
                  }&randomizeIds=true`
                }
                alt={session.user.name ?? ""}
              />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user.name}</p>
              <p className="text-muted-foreground text-xs leading-none">{session.user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOut provider="google" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
