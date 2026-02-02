import { useState } from "react";
import { Link } from "react-router-dom";
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
            <Instagram size={14} />
            <Youtube size={14} />
            <Facebook size={14} />
            <Twitter size={14} />
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
          <nav className="hidden md:flex gap-4 text-sm text-gray-600">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/pages">Pages</Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4 text-blue-500">
            {/* DESKTOP ICONS */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">Login / Register</Link>
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
        <div className="absolute top-full left-0 w-full bg-white border-b z-40">
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
            <Link onClick={() => setMobileOpen(false)} to="/blog">
              Blog
            </Link>
            <Link onClick={() => setMobileOpen(false)} to="/contact">
              Contact
            </Link>
            <Link onClick={() => setMobileOpen(false)} to="/pages">
              Pages
            </Link>
          </div>

          {/* LOGIN */}
          <div className="flex items-center justify-center gap-2 pb-6 text-blue-500">
            <User size={18} />
            <Link to="/login">Login / Register</Link>
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
