import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import VitaSlider from "../components/VitaSlider";

function HomePage() {
  const products = [
    {
      id: 1,
      image: "https://picsum.photos/400/600?10",
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 2,
      image: "https://picsum.photos/400/600?11",
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 3,
      image: "https://picsum.photos/400/600?12",
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 4,
      image: "https://picsum.photos/400/600?13",
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 5,
      image: "https://picsum.photos/400/600?14",
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 6,
      image: "https://picsum.photos/400/600?15",
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 7,
      image: "https://picsum.photos/400/600?16",
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 8,
      image: "https://picsum.photos/400/600?17",
      title: "Graphic Design",
      price: "$16.48",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/*  Slider */}
      <HeroSlider />

      {/* Editors Pick */}
      <section className="px-4 mt-16">
        <h2 className="text-lg font-semibold text-center mb-2">
          EDITOR’S PICK
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Problems trying to resolve the conflict between
        </p>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-4 md:px-0">
          {/* LEFT – MEN */}
          <div className="relative md:w-1/2">
            <img
              src="https://picsum.photos/600/800?1"
              alt="Men"
              className="w-full h-[500px] object-cover"
            />
            <span className="absolute bottom-4 left-4 bg-white px-4 py-2 text-sm font-semibold">
              MEN
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col md:flex-row gap-6 md:w-1/2">
            {/* WOMEN */}
            <div className="relative md:w-1/2">
              <img
                src="https://picsum.photos/600/800?2"
                alt="Women"
                className="w-full h-[500px] object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-white px-4 py-2 text-sm font-semibold">
                WOMEN
              </span>
            </div>

            {/* ACCESSORIES + KIDS */}
            <div className="flex flex-col gap-6 md:w-1/2">
              <div className="relative">
                <img
                  src="https://picsum.photos/300/300?3"
                  alt="Accessories"
                  className="w-full h-[235px] object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-semibold">
                  ACCESSORIES
                </span>
              </div>

              <div className="relative">
                <img
                  src="https://picsum.photos/300/300?4"
                  alt="Kids"
                  className="w-full h-[235px] object-cover"
                />
                <span className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-semibold">
                  KIDS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestseller Products */}
      <section className="mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-semibold text-center mb-8">
            BESTSELLER PRODUCTS
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                subtitle="English Department"
                price="$6.48"
                oldPrice="$16.48"
                colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vita Classic Product */}
      <VitaSlider />

      {/* Part of the Neural Universe */}
      <section className="mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src="https://picsum.photos/600/500?200"
                alt="Neural Universe"
                className="w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
              <span className="text-xs uppercase tracking-wide text-gray-500">
                Summer 2020
              </span>

              <h2 className="text-2xl md:text-3xl font-bold">
                Part of the Neural <br /> Universe
              </h2>

              <p className="text-sm text-gray-500 max-w-md mx-auto md:mx-0">
                We know how large objects will act, but things on a small scale.
              </p>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-3 items-center md:items-start mt-4">
                <button className="bg-[#2DC071] text-white px-4 py-2 text-xs font-semibold min-w-[120px] text-center">
                  BUY NOW
                </button>
                <button className="border border-[#2DC071] text-[#2DC071] px-4 py-2 text-xs font-semibold min-w-[120px] text-center">
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <span className="block text-center text-sm text-blue-500 font-semibold mb-2">
            Practice Advice
          </span>

          <h2 className="text-3xl font-bold text-center mb-2">
            Featured Posts
          </h2>

          <p className="text-sm text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[101, 102, 103].map((id) => (
              <div
                key={id}
                className="border rounded-lg overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={`https://picsum.photos/400/250?${id}`}
                    alt="Post"
                    className="w-full h-[250px] object-cover"
                  />

                  {/* NEW badge */}
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded">
                    NEW
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Tags */}
                  <div className="flex gap-3 text-xs">
                    <span className="text-blue-500 cursor-pointer">Google</span>
                    <span className="text-gray-400">Trending</span>
                    <span className="text-gray-400">New</span>
                  </div>

                  <h3 className="font-semibold text-base">
                    Loudest à la Madison #1 (L'integral)
                  </h3>

                  <p className="text-sm text-gray-500">
                    We focus on ergonomics and meeting you where you work. It's
                    only a keystroke away.
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
                    <span>📅 22 April 2021</span>
                    <span>💬 10 comments</span>
                  </div>

                  <span className="text-sm font-semibold text-blue-500 cursor-pointer mt-2">
                    Learn More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
