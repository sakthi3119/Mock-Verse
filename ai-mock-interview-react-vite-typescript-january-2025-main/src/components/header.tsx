import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./navigation-routes";
import { NavLink } from "react-router-dom";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";

const Header = () => {
  const { userId } = useAuth();

  return (
    <header
      className={cn("w-full bg-[rgba(18,24,38,0.92)] border-b border-b-[#2c5364] shadow-lg backdrop-blur-md duration-150 transition-all ease-in-out z-50")}
    >
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/* logo section */}
          <div className="flex items-center">
            <LogoContainer />
            {/* <span className="ml-2 text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-400 drop-shadow-lg select-none hidden md:inline">
              MOCK VERSE
            </span> */}
          </div>

          {/* navigation section */}
          <nav className="hidden md:flex items-center gap-3">
            <NavigationRoutes />
            {userId && (
              <NavLink
                to={"/generate"}
                className={cn("text-base px-3 py-1 rounded transition-colors duration-200 text-white hover:bg-white/10")}

              >
                Take An Interview
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-6">
            {/* profile section */}
            <ProfileContainer />

            {/* mobile toggle section */}
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;