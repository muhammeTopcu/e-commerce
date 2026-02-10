import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Search,
  ShoppingCart,
  Heart,
  Menu,
  User,
} from "lucide-react";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.client.user);
  const userEmail = user?.email;
  const userName = user?.name || user?.fullName || "User";

  return (
    <header className="w-full relative bg-white">
      {/* TOP BAR – DESKTOP ONLY */}
      <div className="hidden md:block bg-[#23856D] text-white text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <span>(225) 555-0118</span>
            <span>michelle.rivera@example.com</span>
          </div>

          <div>Follow Us and get a chance to win 80% off</div>

          <div className="flex items-center gap-2">
            <span className="mr-1">Follow Us :</span>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="YouTube"
            >
              <Youtube size={14} />
            </a>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="Facebook"
            >
              <Facebook size={14} />
            </a>
            <a
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-label="Twitter"
            >
              <Twitter size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-6">
          {/* LOGO */}
          <h1 className="text-xl font-bold">
            <Link to="/">Bandage</Link>
          </h1>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-4 text-sm text-gray-600 relative">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <div className="relative group">
              <span className="flex items-center gap-1 cursor-pointer">
                Pages
                <span aria-hidden="true" className="text-xs leading-none">
                  ▼
                </span>
              </span>
              <div className="absolute left-0 top-full mt-1 w-40 rounded-md border bg-white shadow-lg z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition">
                <span className="absolute -top-3 left-0 h-3 w-full" />
                <Link
                  to="/team"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  Team
                </Link>
              </div>
            </div>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4 text-blue-500">
            {/* DESKTOP ICONS */}
            <div className="hidden md:flex items-center gap-2">
              {userEmail ? (
                <div className="flex items-center gap-2 text-gray-700">
                  <Gravatar
                    email={userEmail}
                    size={28}
                    default="identicon"
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{userName}</span>
                </div>
              ) : (
                <>
                  <Link to="/login" state={{ from: location.pathname }}>
                    Login
                  </Link>
                  <span>/</span>
                  <Link to="/signup">Register</Link>
                </>
              )}
              <Search size={18} />
              <ShoppingCart size={18} />
              <Heart size={18} />
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU*/}
      {mobileOpen && (
        <div className="w-full bg-white border-b">
          {/* LINKS */}
          <div className="flex flex-col items-center gap-6 py-10 text-lg text-gray-600">
            <Link onClick={() => setMobileOpen(false)} to="/">
              Home
            </Link>
            <Link onClick={() => setMobileOpen(false)} to="/shop">
              Shop
            </Link>
            <Link onClick={() => setMobileOpen(false)} to="/about">
              About
            </Link>
            <Link onClick={() => setMobileOpen(false)} to="/team">
              Team
            </Link>
            <Link onClick={() => setMobileOpen(false)} to="/blog">
              Blog
            </Link>
            <Link onClick={() => setMobileOpen(false)} to="/contact">
              Contact
            </Link>
          </div>

          {/* LOGIN */}
          <div className="flex items-center justify-center gap-2 pb-6 text-blue-500">
            <User size={18} />
            {userEmail ? (
              <div className="flex items-center gap-2 text-gray-700">
                <Gravatar
                  email={userEmail}
                  size={24}
                  default="identicon"
                  className="rounded-full"
                />
                <span className="text-sm font-medium">{userName}</span>
              </div>
            ) : (
              <>
                <Link to="/login" state={{ from: location.pathname }}>
                  Login
                </Link>
                <span>/</span>
                <Link to="/signup">Register</Link>
              </>
            )}
          </div>

          {/* ICONS */}
          <div className="flex justify-center gap-8 pb-8 text-blue-500">
            <Search size={22} />
            <ShoppingCart size={22} />
            <Heart size={22} />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
