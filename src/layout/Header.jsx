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
} from "lucide-react";

function Header() {
  return (
    <header className="w-full">
      {/* TOP BAR – desktop only */}
      <div className="hidden md:block bg-[#252B42] text-white text-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <span>(225) 555-0118</span>
            <span>michelle.rivera@example.com</span>
          </div>

          {/* CENTER */}
          <div className="text-center">
            Follow Us and get a chance to win 80% off
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2">
            <span className="mr-1">Follow Us :</span>
            <Instagram
              size={14}
              className="cursor-pointer hover:text-gray-300"
            />
            <Youtube size={14} className="cursor-pointer hover:text-gray-300" />
            <Facebook
              size={14}
              className="cursor-pointer hover:text-gray-300"
            />
            <Twitter size={14} className="cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-6">
          {/* LEFT */}
          <div className="flex items-center gap-8">
            <h1 className="text-xl font-bold">
              <Link to="/">Bandage</Link>
            </h1>

            {/* NAV – desktop */}
            <nav className="hidden md:flex gap-4 text-sm text-gray-600">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/pages">Pages</Link>
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 text-sm">
            <div className="hidden md:flex gap-4 text-blue-500">
              <Link to="/login">Login / Register</Link>
            </div>

            <Search size={18} />
            <ShoppingCart size={18} />
            <Heart size={18} />

            {/* MOBILE MENU ICON */}
            <Menu className="md:hidden" size={22} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
