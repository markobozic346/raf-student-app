"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

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
    <div className="w-full mb-10 flex items-center justify-between">
      <p>RAF student app</p>
      <NavigationMenu>
        <NavigationMenuList>
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

      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>Prijavi se</SignInButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
