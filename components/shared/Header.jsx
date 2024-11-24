import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

import { SignedIn, SignedOut, UserButton } from "../auth/Helper";
const Header = async () => {
  return (
    <header className="flex flex-1 w-full fixed border-b backdrop-blur glass  z-50  ">
      <div className="wrapper w-full mx-7 flex items-center justify-between">
        <div className="flex-row flex items-center w-1/2 ">
          <Link href="/" className=" flex flex-row">
            <Image
              src="/assets/logo.png"
              className="h-16 w-96"
              width={300}
              height={100}
              alt="BadjiTn logo"
            />
          </Link>{" "}
          <h1 className="text-xl font-bold">admin</h1>
        </div>
        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs"></nav>
        </SignedIn>

        <div className="flex w-32 justify-end items-center align-middle gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
