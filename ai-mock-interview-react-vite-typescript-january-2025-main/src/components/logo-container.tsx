import { Link } from "react-router-dom";

export const LogoContainer = () => {
  return (
    <Link to={"/"} className="flex items-center h-full">
      <img
        src="/assets/img/head.png"
        alt="Mock Verse Logo"
        className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain rounded-lg border-2 border-white/40 shadow-md aspect-square"
        style={{ background: "transparent", display: "block" }}
      />
    </Link>
  );
};
