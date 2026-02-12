import ProductCard from "../components/ProductCard";
import hooli from "../assets/brands/hooli.png";
import lyft from "../assets/brands/lyft.png";
import digeri from "../assets/brands/digeri.png";
import stripe from "../assets/brands/stripe.png";
import aws from "../assets/brands/aws.png";
import reddit from "../assets/brands/reddit.png";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import product1 from "../assets/product/1.png";
import product2 from "../assets/product/2.png";
import product3 from "../assets/product/3.png";
import product4 from "../assets/product/4.png";
import product5 from "../assets/product/5.png";
import product6 from "../assets/product/6.png";
import product7 from "../assets/product/7.png";
import product8 from "../assets/product/8.png";
import product9 from "../assets/product/9.png";
import product10 from "../assets/product/10.png";
import product11 from "../assets/product/11.png";
import product12 from "../assets/product/12.png";
import category1 from "../assets/shopPageCategories/1.png";
import category2 from "../assets/shopPageCategories/2.png";
import category3 from "../assets/shopPageCategories/3.png";
import category4 from "../assets/shopPageCategories/4.png";
import category5 from "../assets/shopPageCategories/5.png";

const slugify = (value = "") =>
  String(value).toLowerCase().trim().replace(/\s+/g, "-");

const getCategoryGenderSlug = (category) => {
  const gender = String(category?.gender || category?.gender_code || "k").toLowerCase();
  return gender === "e" ? "erkek" : "kadin";
};

const categoryHref = (category) =>
  `/shop/${getCategoryGenderSlug(category)}/${slugify(
    category?.title || category?.name || "kategori",
  )}/${category?.id}`;

const products = [
  { id: 1, image: product1, title: "Graphic Design", price: "$16.48" },
  { id: 2, image: product2, title: "Graphic Design", price: "$16.48" },
  { id: 3, image: product3, title: "Graphic Design", price: "$16.48" },
  { id: 4, image: product4, title: "Graphic Design", price: "$16.48" },
  { id: 5, image: product5, title: "Graphic Design", price: "$16.48" },
  { id: 6, image: product6, title: "Graphic Design", price: "$16.48" },
  { id: 7, image: product7, title: "Graphic Design", price: "$16.48" },
  { id: 8, image: product8, title: "Graphic Design", price: "$16.48" },
  { id: 9, image: product9, title: "Graphic Design", price: "$16.48" },
  { id: 10, image: product10, title: "Graphic Design", price: "$16.48" },
  { id: 11, image: product11, title: "Graphic Design", price: "$16.48" },
  { id: 12, image: product12, title: "Graphic Design", price: "$16.48" },
];

const fallbackCategoryImages = [category1, category2, category3, category4, category5];

function ShopPage() {
  const { gender, categoryName, categoryId } = useParams();
  const categories = useSelector((state) => state.product.categories);

  const selectedCategoryLabel = categoryName
    ? `${gender || ""} / ${categoryName} / ${categoryId || ""}`
    : "Shop";

  const womenCategories = categories.filter(
    (category) => getCategoryGenderSlug(category) === "kadin",
  );
  const menCategories = categories.filter(
    (category) => getCategoryGenderSlug(category) === "erkek",
  );
  const topCategoryCards = (
    Array.isArray(categories) && categories.length
      ? categories.slice(0, 5)
      : fallbackCategoryImages.map((_, index) => ({
          id: index + 1,
          title: "CLOTHS",
        }))
  ).map((category, index) => ({
    ...category,
    image: fallbackCategoryImages[index % fallbackCategoryImages.length],
  }));

  return (
    <div className="flex flex-col gap-6 px-0 md:px-4 mt-6">
      {/* PAGE HEADER */}
      <section>
        <div className="max-w-6xl mx-auto px-0 md:px-4 py-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#252B42]">Shop</h1>

          <div className="text-sm text-gray-500">
            <span className="text-[#252B42]">Home</span>
            <span className="mx-2">{">"}</span>
            <span>{selectedCategoryLabel}</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-4">
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topCategoryCards.map((cat) => (
              <Link
                to={categoryHref(cat)}
                key={cat.id}
                className="group relative block overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.title || cat.name}
                  className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-100 transition flex flex-col items-center justify-center text-white group-hover:bg-black/50">
                  <span className="text-sm font-semibold tracking-wide">
                    {(cat.title || cat.name || "CLOTHS").toUpperCase()}
                  </span>
                  <span className="text-xs mt-1 opacity-80">Explore</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALL CATEGORIES */}
      <section>
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <h3 className="text-base font-semibold text-[#252B42] mb-3">
            All Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-[#252B42] mb-2">Kadin</h4>
              <div className="flex flex-wrap gap-2">
                {womenCategories.map((category) => (
                  <Link
                    key={`w-${category.id}`}
                    to={categoryHref(category)}
                    className="px-3 py-2 border text-sm text-gray-600 hover:bg-gray-100"
                  >
                    {category.title || category.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#252B42] mb-2">Erkek</h4>
              <div className="flex flex-wrap gap-2">
                {menCategories.map((category) => (
                  <Link
                    key={`m-${category.id}`}
                    to={categoryHref(category)}
                    className="px-3 py-2 border text-sm text-gray-600 hover:bg-gray-100"
                  >
                    {category.title || category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="border-b mt-6">
        <div className="max-w-6xl mx-auto px-0 md:px-4 py-6 flex items-center justify-between text-sm">
          <span className="text-gray-600">Showing 16 results</span>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">View:</span>
              <button className="w-8 h-8 border flex items-center justify-center">
                ⬛
              </button>
              <button className="w-8 h-8 border flex items-center justify-center">
                ☰
              </button>
            </div>

            <select className="border px-3 py-2 text-sm">
              <option>Popularity</option>
            </select>

            <button className="bg-[#23A6F0] text-white px-4 py-2 text-sm">
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mt-8">
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="block"
              >
                <ProductCard
                  image={product.image}
                  title={product.title}
                  subtitle="English Department"
                  price="$6.48"
                  oldPrice="$16.48"
                  colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PAGINATION */}
      <section className="pb-8">
        <div className="flex justify-center items-center gap-2 text-sm">
          <button className="px-3 py-2 border text-gray-400">Prev</button>
          <button className="px-3 py-2 border bg-blue-500 text-white">1</button>
          <button className="px-3 py-2 border text-gray-600">2</button>
          <button className="px-3 py-2 border text-gray-600">Next</button>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-8 ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <img src={hooli} alt="Hooli" className="h-10 md:h-12 " />
          <img src={lyft} alt="Lyft" className="h-10 md:h-12 " />
          <img src={digeri} alt="Brand" className="h-10 md:h-12 " />
          <img src={stripe} alt="Stripe" className="h-10 md:h-12 " />
          <img src={aws} alt="AWS" className="h-10 md:h-12 " />
          <img src={reddit} alt="Reddit" className="h-10 md:h-12 " />
        </div>
      </section>
    </div>
  );
}

export default ShopPage;

