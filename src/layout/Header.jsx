import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Gravatar from "react-gravatar";
import { clearAuthToken } from "../api/axiosInstance";
import { setUser } from "../store/actions/clientActions";
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

const slugify = (value = "") =>
  String(value).toLowerCase().trim().replace(/\s+/g, "-");

const getCategoryGenderSlug = (category) => {
  const gender = String(
    category?.gender || category?.gender_code || "k",
  ).toLowerCase();
  return gender === "e" ? "erkek" : "kadin";
};

const categoryHref = (category) =>
  `/shop/${getCategoryGenderSlug(category)}/${slugify(
    category?.title || category?.name || "kategori",
  )}/${category?.id}`;

const getCartImage = (product) => {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    const firstImage = product.images[0];
    if (typeof firstImage === "string") return firstImage;
    if (firstImage?.url) return firstImage.url;
  }
  if (product?.image?.url) return product.image.url;
  if (product?.image_url) return product.image_url;
  if (product?.image) return product.image;
  return "";
};

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.client.user);
  const categories = useSelector((state) => state.product.categories);
  const cart = useSelector((state) => state.shoppingCart.cart);

  const userEmail = user?.email;
  const userName = user?.name || user?.fullName || "User";

  const groupedCategories = useMemo(() => {
    const women = [];
    const men = [];

    categories.forEach((category) => {
      if (getCategoryGenderSlug(category) === "erkek") {
        men.push(category);
      } else {
        women.push(category);
      }
    });

    return { women, men };
  }, [categories]);

  const totalCartCount = useMemo(
    () => cart.reduce((sum, item) => sum + Number(item?.count || 0), 0),
    [cart],
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearAuthToken();
    dispatch(setUser({}));
    setMobileOpen(false);
    setCartOpen(false);
    navigate("/");
  };

  return (
    <header className="w-full relative bg-white">
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

      <div className="border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-6">
          <h1 className="text-xl font-bold">
            <Link to="/">Bandage</Link>
          </h1>

          <nav className="hidden md:flex gap-4 text-sm text-gray-600 relative">
            <Link to="/">Home</Link>

            <div className="relative group">
              <Link to="/shop" className="flex items-center gap-1">
                Shop
                <span aria-hidden="true" className="text-xs leading-none">
                  v
                </span>
              </Link>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[520px] rounded-md border bg-white shadow-lg z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition">
                <div className="grid grid-cols-2 gap-8 p-6">
                  <div>
                    <h4 className="font-semibold text-[#252B42] mb-3">Kadin</h4>
                    <div className="space-y-2">
                      {groupedCategories.women.map((category) => (
                        <Link
                          key={`w-${category.id}`}
                          to={categoryHref(category)}
                          className="block text-sm text-gray-600 hover:text-[#23A6F0]"
                        >
                          {category.title || category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#252B42] mb-3">Erkek</h4>
                    <div className="space-y-2">
                      {groupedCategories.men.map((category) => (
                        <Link
                          key={`m-${category.id}`}
                          to={categoryHref(category)}
                          className="block text-sm text-gray-600 hover:text-[#23A6F0]"
                        >
                          {category.title || category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
            <div className="relative group">
              <span className="flex items-center gap-1 cursor-pointer">
                Pages
                <span aria-hidden="true" className="text-xs leading-none">
                  v
                </span>
              </span>
              <div className="absolute left-0 top-full pt-2 w-40 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto transition">
                <div className="rounded-md border bg-white shadow-lg">
                  <Link
                    to="/team"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    Team
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-4 text-blue-500">
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
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-xs text-blue-500 hover:text-red-600"
                  >
                    Logout
                  </button>
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
              <div className="relative">
                <button
                  type="button"
                  className="relative text-blue-500"
                  aria-label="Shopping cart"
                  aria-expanded={cartOpen}
                  onClick={() => setCartOpen((prev) => !prev)}
                >
                  <ShoppingCart size={18} />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] rounded-full bg-orange-500 text-white text-[10px] leading-[18px] text-center px-1">
                      {totalCartCount}
                    </span>
                  )}
                </button>
                {cartOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[360px] rounded-md border bg-white shadow-lg z-50">
                    <div className="p-4 border-b">
                      <h4 className="text-[#252B42] font-semibold">
                        Sepetim ({totalCartCount} Urun)
                      </h4>
                    </div>
                    <div className="max-h-[320px] overflow-y-auto">
                      {cart.length === 0 ? (
                        <p className="p-4 text-sm text-gray-500">Sepet bos.</p>
                      ) : (
                        cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="p-4 border-b flex gap-3 items-start"
                          >
                            <img
                              src={getCartImage(item.product)}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded border"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-[#252B42] line-clamp-2">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Adet: {item.count}
                              </p>
                              <p className="text-sm text-[#E77C40] font-semibold mt-1">
                                ${item.product.price}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Heart size={18} />
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="w-full bg-white border-b">
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
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
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

          <div className="flex justify-center gap-8 pb-8 text-blue-500">
            <Search size={22} />
            <button
              type="button"
              className="relative"
              aria-expanded={cartOpen}
              onClick={() => setCartOpen((prev) => !prev)}
            >
              <ShoppingCart size={22} />
              {totalCartCount > 0 && (
                <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] rounded-full bg-orange-500 text-white text-[10px] leading-[18px] text-center px-1">
                  {totalCartCount}
                </span>
              )}
            </button>
            <Heart size={22} />
          </div>

          {cartOpen && (
            <div className="px-4 pb-8">
              <div className="mx-auto max-w-md rounded-md border bg-white">
                <div className="p-4 border-b">
                  <h4 className="text-[#252B42] font-semibold">
                    Sepetim ({totalCartCount} Urun)
                  </h4>
                </div>
                <div className="max-h-[260px] overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="p-4 text-sm text-gray-500">Sepet bos.</p>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={`mobile-${item.product.id}`}
                        className="p-4 border-b flex gap-3 items-start"
                      >
                        <img
                          src={getCartImage(item.product)}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded border"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#252B42] line-clamp-2">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Adet: {item.count}
                          </p>
                          <p className="text-sm text-[#E77C40] font-semibold mt-1">
                            ${item.product.price}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
