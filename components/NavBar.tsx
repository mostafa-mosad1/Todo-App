import { ModeToggle } from "@/components/ModeToggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
function NavBar() {
    return (
        <>
          <div className="container mx-auto flex justify-between">
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
            </div>  
        </>
    )
}

export default NavBar;