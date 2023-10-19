"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { ModeToggle } from "../ui/mode-toggle";

const headerData = [
  {
    id: "1",
    name: "Servis",
    link: "https://servis.raf.edu.rs/index.php/home",
  },
  {
    id: "2",
    name: "Registar linkova",
    link: "https://docs.google.com/spreadsheets/d/15tbtOsjglTxEZVEqkpzZl0WTFHbRHo3Iq5oNmgR-i2Y/edit#gid=0",
  },
  {
    id: "3",
    name: "Mail lista",
    link: "https://maillist.raf.edu.rs/",
  },
  {
    id: "4",
    name: "Prijava ispita",
    link: "https://akreditacija.raf.edu.rs/SSluzba/",
  },
];

const Header = () => {
  return (
    <div className="w-full mb-10 flex  flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
      <p className="text-blue-500 text-2xl">RAF student app</p>
      <NavigationMenu>
        <NavigationMenuList className="flex-col md:flex-row">
          {headerData.map((item) => (
            <NavigationMenuItem key={item.id + "header-link"}>
              <NavigationMenuLink
                href={item.link}
                target="_blank"
                className={navigationMenuTriggerStyle()}
              >
                {item.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <ModeToggle />

      <div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton>Prijavi se</SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
