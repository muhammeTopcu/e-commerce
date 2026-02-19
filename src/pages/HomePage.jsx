import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import VitaSlider from "../components/VitaSlider";
import { Link } from "react-router-dom";
import menImage from "../assets/home/men.png";
import womenImage from "../assets/home/women.png";
import accessoriesImage from "../assets/home/accessories.png";
import kidsImage from "../assets/home/kids.png";
import partOfImage from "../assets/home/part_of.png";
import featured1 from "../assets/home/featured1.png";
import featured2 from "../assets/home/featured2.png";
import featured3 from "../assets/home/featured3.png";
import product1 from "../assets/home/1.png";
import product2 from "../assets/home/2.png";
import product3 from "../assets/home/3.png";
import product4 from "../assets/home/4.png";
import product5 from "../assets/home/5.png";
import product6 from "../assets/home/6.png";
import product7 from "../assets/home/7.png";
import product8 from "../assets/home/8.png";

function HomePage() {
  const products = [
    {
      id: 1,
      image: product1,
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 2,
      image: product2,
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 3,
      image: product3,
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 4,
      image: product4,
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 5,
      image: product5,
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 6,
      image: product6,
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 7,
      image: product7,
      title: "Graphic Design",
      price: "$16.48",
    },
    {
      id: 8,
      image: product8,
      title: "Graphic Design",
      price: "$16.48",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/*  Slider */}
      <div className="-mx-6 md:mx-0">
        <HeroSlider />
      </div>

      {/* Editors Pick */}
      <section className="px-0 md:px-4 mt-16">
        <h2 className="text-lg font-semibold text-center mb-2">
          EDITOR’S PICK
        </h2>
        <p className="text-sm text-center text-gray-500 mb-8">
          Problems trying to resolve the conflict between
        </p>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 px-0">
          {/* LEFT – MEN */}
          <Link to="/shop" className="relative md:w-1/2 group">
            <img
              src={menImage}
              alt="Men"
              className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-4 left-4 bg-white px-4 py-2 text-sm font-semibold">
              MEN
            </span>
          </Link>

          {/* RIGHT */}
          <div className="flex flex-col md:flex-row gap-6 md:w-1/2">
            {/* WOMEN */}
            <Link to="/shop" className="relative md:w-1/2 group">
              <img
                src={womenImage}
                alt="Women"
                className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute bottom-4 left-4 bg-white px-4 py-2 text-sm font-semibold">
                WOMEN
              </span>
            </Link>

            {/* ACCESSORIES + KIDS */}
            <div className="flex flex-col gap-6 md:w-1/2">
              <Link to="/shop" className="relative group">
                <img
                  src={accessoriesImage}
                  alt="Accessories"
                  className="w-full h-[235px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-semibold">
                  ACCESSORIES
                </span>
              </Link>

              <Link to="/shop" className="relative group">
                <img
                  src={kidsImage}
                  alt="Kids"
                  className="w-full h-[235px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-4 left-4 bg-white px-3 py-1 text-sm font-semibold">
                  KIDS
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bestseller Products */}
      <section className="mt-16">
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <span className="block text-center text-sm text-gray-500  mb-2">
            Featured Products
          </span>
          <h2 className="text-lg font-semibold text-center mb-2">
            BESTSELLER PRODUCTS
          </h2>
          <p className="text-sm text-center text-gray-500 mb-8">
            Problems trying to resolve the conflict between
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
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

      {/* Vita Classic Product */}
      <div className="-mx-6 md:mx-0">
        <VitaSlider />
      </div>

      {/* Part of the Neural Universe */}
      <section className="mt-0">
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={partOfImage}
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
        <div className="max-w-6xl mx-auto px-0 md:px-4">
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
            {[featured1, featured2, featured3].map((image) => (
              <div
                key={image}
                className="border rounded-lg overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={image}
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
