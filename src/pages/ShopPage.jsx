import ProductCard from "../components/ProductCard";
import hooli from "../assets/brands/hooli.png";
import lyft from "../assets/brands/lyft.png";
import digeri from "../assets/brands/digeri.png";
import stripe from "../assets/brands/stripe.png";
import aws from "../assets/brands/aws.png";
import reddit from "../assets/brands/reddit.png";
import { Link } from "react-router-dom";

const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/400/600?shop=${i}`,
  title: "Graphic Design",
  price: "$16.48",
}));

const categories = [
  { id: 1, title: "CLOTHS", image: "https://picsum.photos/400/250?31" },
  { id: 2, title: "CLOTHS", image: "https://picsum.photos/400/250?32" },
  { id: 3, title: "CLOTHS", image: "https://picsum.photos/400/250?33" },
  { id: 4, title: "CLOTHS", image: "https://picsum.photos/400/250?34" },
  { id: 5, title: "CLOTHS", image: "https://picsum.photos/400/250?35" },
];

function ShopPage() {
  return (
    <div className="flex flex-col gap-6 px-0 md:px-4 mt-6">
      {/* PAGE HEADER */}
      <section>
        <div className="max-w-6xl mx-auto px-0 md:px-4 py-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-[#252B42]">Shop</h1>

          <div className="text-sm text-gray-500">
            <span className="text-[#252B42]">Home</span>
            <span className="mx-2">{">"}</span>
            <span>Shop</span>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-4">
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                to="#"
                key={cat.id}
                className="group relative block overflow-hidden"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-[220px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white">
                  <span className="text-sm font-semibold tracking-wide">
                    {cat.title}
                  </span>
                  <span className="text-xs mt-1 opacity-80">Explore</span>
                </div>
              </Link>
            ))}
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
