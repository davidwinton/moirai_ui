// "use client";
// /*
//  * Documentation:
//  * Default Page Layout — https://app.subframe.com/007b7d1e11bb/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
//  * Topbar with center search — https://app.subframe.com/007b7d1e11bb/library?component=Topbar+with+center+search_3bd79561-0143-4651-931b-3b7260b0b798
//  * Text Field — https://app.subframe.com/007b7d1e11bb/library?component=Text+Field_be48ca43-f8e7-4c0e-8870-d219ea11abfe
//  * Button — https://app.subframe.com/007b7d1e11bb/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
//  * Dropdown Menu — https://app.subframe.com/007b7d1e11bb/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
//  * Avatar — https://app.subframe.com/007b7d1e11bb/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
//  */

// import * as SubframeCore from "@subframe/core";
// import SearchComponent from "components/Search/Search";
// import Link from "next/link";
// import React from "react";
// import { Avatar } from "../components/Avatar";
// import { DropdownMenu } from "../components/DropdownMenu";
// import { TopbarWithCenterSearch } from "../components/TopbarWithCenterSearch";
// import SignIn from "components/SignIn/SignIn";

// interface DefaultPageLayoutRootProps
//   extends React.HTMLAttributes<HTMLDivElement> {
//   children?: React.ReactNode;
//   className?: string;
// }

// const DefaultPageLayoutRoot = React.forwardRef<
//   HTMLElement,
//   DefaultPageLayoutRootProps
// >(function DefaultPageLayoutRoot(
//   { children, className, ...otherProps }: DefaultPageLayoutRootProps,
//   ref
// ) {


//   return (
//     <div
//       className={SubframeCore.twClassNames(
//         "flex h-screen w-full flex-col items-center",
//         className
//       )}
//       ref={ref as any}
//       {...otherProps}
//     >
//       <TopbarWithCenterSearch
//         leftSlot={
//           <>
//             <img
//               className="h-6 flex-none object-cover"
//               src="/images/MoiraiLogo.png"
//             />
//             <div className="flex items-center gap-2">
//               <Link href="/company_list/1">
//                 <TopbarWithCenterSearch.NavItem>
//                   Moirai
//                 </TopbarWithCenterSearch.NavItem>
//               </Link>
//               <Link href="/company_list/1">
//                 <TopbarWithCenterSearch.NavItem>
//                   Recommendations
//                 </TopbarWithCenterSearch.NavItem>
//               </Link>
//               <TopbarWithCenterSearch.NavItem>
//                 Search
//               </TopbarWithCenterSearch.NavItem>
//             </div>
//           </>
//         }
//         centerSlot={
//           // <TextField
//           //   className="h-auto grow shrink-0 basis-0"
//           //   variant="filled"
//           //   label=""
//           //   helpText=""
//           //   icon="FeatherSearch"
//           // >
//           //   <TextField.Input placeholder="Quick Search" />
//           // </TextField>
//           <div className="h-auto grow shrink-0 basis-0">
// <SearchComponent />
//           </div>
          
//         }
//         rightSlot={
//           <>
//           <SignIn />
//           {/* <SignIn />
//             <SubframeCore.DropdownMenu.Root>
//               <SubframeCore.DropdownMenu.Trigger asChild={true}>
//                 <Avatar image="https://res.cloudinary.com/subframe/image/upload/v1736981733/uploads/3896/fernuedpg37czbsk0glh.png">
//                   D
//                 </Avatar>
//               </SubframeCore.DropdownMenu.Trigger>
//               <SubframeCore.DropdownMenu.Portal>
//                 <SubframeCore.DropdownMenu.Content
//                   side="bottom"
//                   align="end"
//                   sideOffset={4}
//                   asChild={true}
//                 >
//                   <DropdownMenu>
//                     <DropdownMenu.DropdownItem icon="FeatherUser">
//                       Profile
//                     </DropdownMenu.DropdownItem>
//                     <DropdownMenu.DropdownItem icon="FeatherSettings">
//                       Settings
                      
//                     </DropdownMenu.DropdownItem>
//                     <DropdownMenu.DropdownItem icon="FeatherLogOut">
//                       Log out
//                     </DropdownMenu.DropdownItem>
//                   </DropdownMenu>
//                 </SubframeCore.DropdownMenu.Content>
//               </SubframeCore.DropdownMenu.Portal>
//             </SubframeCore.DropdownMenu.Root> */}
//           </>
//         }
//       />
//       {children ? (
//         <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-4 overflow-y-auto bg-default-background">
//           {children}
//         </div>
//       ) : null}
//     </div>
//   );
// });

// export const DefaultPageLayout = DefaultPageLayoutRoot;
"use client";

import { signIn, signOut } from "auth";
import Link from "next/link";

interface UserSession {
  user?: {
    name?: string;
    email?: string;
    image?: string;
  };
}

export function DefaultPageLayout({ session }: { session: UserSession | null }) {
    return (
        <nav className="flex items-center justify-between p-4 shadow-md bg-white">
            {/* Left Side - Logo and Navigation */}
            <div className="flex items-center gap-6">
                <img className="h-8 w-auto" src="/images/MoiraiLogo.png" alt="Logo" />
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

            {/* Center - Search Bar */}
            <div className="w-1/3">
                <input
                    type="text"
                    placeholder="Quick Search..."
                    className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Right Side - Login Button or Avatar */}
            <div>
                {session?.user?.image ? (
                    <button onClick={() => signOut()}>
                        <img
                            src={session.user.image}
                            alt="User Avatar"
                            className="h-10 w-10 rounded-full border"
                        />
                    </button>
                ) : (
                    <button
                        onClick={() => signIn("google")}
                        className="px-4 py-2 border rounded-lg text-blue-500 hover:bg-blue-100"
                    >
                        Log In
                    </button>
                )}
            </div>
        </nav>
    );
}
