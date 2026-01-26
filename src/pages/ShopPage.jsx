import ProductCard from "../components/ProductCard";

const products = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  image: `https://picsum.photos/400/600?shop=${i}`,
  title: "Graphic Design",
  price: "$16.48",
}));

const categories = [
  { id: 1, title: "CLOTHS", image: "https://picsum.photos/400/250?31" },
  { id: 2, title: "BAGS", image: "https://picsum.photos/400/250?32" },
  { id: 3, title: "SHOES", image: "https://picsum.photos/400/250?33" },
  { id: 4, title: "ACCESSORIES", image: "https://picsum.photos/400/250?34" },
];

function ShopPage() {
  return (
    <div className="flex flex-col gap-10 px-4 mt-6">
      {/* Categories */}
      <section className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col gap-4 md:grid md:grid-cols-4 md:gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="relative">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-[160px] md:h-[220px] object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-white px-4 py-2 text-sm font-semibold">
                {cat.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-600">
          <span>Showing 16 results</span>

          <div className="flex items-center gap-2">
            <span>View:</span>
            <div className="w-6 h-6 border flex items-center justify-center text-xs">
              ⬛
            </div>
            <div className="w-6 h-6 border flex items-center justify-center text-xs">
              ☰
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-4 md:mt-0 md:w-48">
          <button className="w-full border px-4 py-2 text-sm text-gray-600 flex justify-between items-center">
            <span>Popularity</span>
            <span>▼</span>
          </button>
        </div>
      </section>

      {/* Product */}
      <section className="max-w-6xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </section>

      {/* Pages */}
      <section className="pb-12">
        <div className="flex justify-center items-center gap-2 text-sm">
          <button className="px-3 py-2 border text-gray-400">Prev</button>
          <button className="px-3 py-2 border bg-blue-500 text-white">1</button>
          <button className="px-3 py-2 border text-gray-600">2</button>
          <button className="px-3 py-2 border text-gray-600">Next</button>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-gray-400">
          <span className="text-3xl font-bold">Hooli</span>
          <span className="text-3xl font-bold">Lyft</span>
          <span className="text-3xl font-bold">Stripe</span>
          <span className="text-3xl font-bold">AWS</span>
          <span className="text-3xl font-bold">Reddit</span>
        </div>
      </section>
    </div>
  );
}

export default ShopPage;
