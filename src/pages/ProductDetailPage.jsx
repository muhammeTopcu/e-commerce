import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../components/ProductCard";
import hooli from "../assets/brands/hooli.png";
import lyft from "../assets/brands/lyft.png";
import stripe from "../assets/brands/stripe.png";
import aws from "../assets/brands/aws.png";
import reddit from "../assets/brands/reddit.png";
import digeri from "../assets/brands/digeri.png";
import detail1 from "../assets/productdetail/1.png";
import detail2 from "../assets/productdetail/2.png";
import detail3 from "../assets/productdetail/3.png";
import detail4 from "../assets/productdetail/4.png";
import detail5 from "../assets/productdetail/5.png";
import detail6 from "../assets/productdetail/6.png";
import detail7 from "../assets/productdetail/7.png";
import detail8 from "../assets/productdetail/8.png";
import detailHead from "../assets/productdetail/head.jpg";
import detailThumb1 from "../assets/productdetail/thumbnail1.jpg";
import detailThumb2 from "../assets/productdetail/thumbnail2.png";

const images = [detailThumb1, detailHead];

const thumbnails = [detailThumb1, detailHead];

const bestsellerProducts = [
  {
    id: 1,
    image: detail1,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
  {
    id: 2,
    image: detail2,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
  {
    id: 3,
    image: detail3,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
  {
    id: 4,
    image: detail4,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
  {
    id: 5,
    image: detail5,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
  {
    id: 6,
    image: detail6,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
  {
    id: 7,
    image: detail7,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
  {
    id: 8,
    image: detail8,
    title: "Graphic Design",
    price: "$6.48",
    oldPrice: "$16.48",
    colors: ["#23A6F0", "#23856D", "#E77C40", "#252B42"],
  },
];

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState("description");
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className="flex flex-col">
      {/* BREADCRUMB */}
      <section className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-0 md:px-4 py-6 text-sm text-gray-500">
          <span className="text-[#252B42]">Home</span>
          <span className="mx-2">{">"}</span>
          <span>Shop</span>
        </div>
      </section>

      {/* TOP SECTION */}
      <section className="py-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
          {/* SLIDER */}
          <div className="w-full md:w-1/2 px-0">
            <Swiper
              modules={[Navigation]}
              navigation
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              initialSlide={1}
              className="w-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`product-${i}`}
                    className="w-full h-[55vh] md:h-[500px] object-cover rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* THUMBNAILS */}
            <div className="flex gap-4 mt-4">
              {thumbnails.map((img, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideTo(i)}
                  className={`border rounded-md overflow-hidden ${
                    activeSlide === i
                      ? "border-[#23A6F0] ring-2 ring-[#23A6F0]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`thumb-${i}`}
                    className={`w-20 h-20 object-cover ${
                      activeSlide === i ? "opacity-70 blur-[0.5px]" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="md:w-1/2 px-0 flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-[#252B42]">
              Floating Phone
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex gap-1 text-yellow-500">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
                <Star size={16} className="text-gray-300" />
              </div>
              <span className="text-sm text-gray-500">10 Reviews</span>
            </div>
            <p className="text-2xl font-bold ">$1,139.33</p>
            <div className="flex items-center gap-1 text-sm">
              <span>Availability :</span>
              <span className="text-blue-600">In Stock</span>
            </div>
            <p className="text-sm text-gray-600">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </p>
            {/* COLORS */}
            <div className="flex gap-3">
              {["#23A6F0", "#23856D", "#E77C40", "#252B42"].map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(event) => event.preventDefault()}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            {/* ACTIONS */}
            <div className="flex items-center gap-4 mt-4">
              <button className="bg-[#23A6F0] text-white px-6 py-3">
                Select Options
              </button>
              <button className="w-10 h-10 border flex items-center justify-center">
                <Heart size={18} />
              </button>
              <button className="w-10 h-10 border flex items-center justify-center">
                <ShoppingCart size={18} />
              </button>
              <button className="w-10 h-10 border flex items-center justify-center">
                <Eye size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="max-w-6xl mx-auto px-0 md:px-4 mt-16">
        <div className="flex justify-center gap-12 border-b pb-4 text-sm font-medium">
          {["description", "additional", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-[#252B42] border-b-2 border-[#23A6F0]"
                  : "text-gray-400"
              }`}
            >
              {tab === "description"
                ? "Description"
                : tab === "additional"
                  ? "Additional Information"
                  : "Reviews (0)"}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
            <img
              src={detailThumb2}
              alt="Product description visual"
              className="w-full object-cover rounded-lg"
            />

            <div className="text-sm text-gray-600 space-y-6">
              <h3 className="text-lg font-semibold text-[#252B42]">
                the quick fox jumps over
              </h3>
              <p>Met minim Mollie non desert Alamo est sit cliquey dolor.</p>
              <p>Met minim Mollie non desert Alamo est sit cliquey dolor.</p>
              <p>Met minim Mollie non desert Alamo est sit cliquey dolor.</p>
            </div>

            <div className="space-y-8 text-sm text-gray-600">
              {[4, 3].map((count, idx) => (
                <div key={idx}>
                  <h4 className="text-lg font-semibold text-[#252B42] mb-4">
                    the quick fox jumps over
                  </h4>
                  <ul className="space-y-3">
                    {Array.from({ length: count }).map((_, i) => (
                      <li key={i} className="flex gap-2">
                        <span>{">"}</span>
                        <span>the quick fox jumps over the lazy dog</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* BESTSELLER */}
      <section className="max-w-6xl mx-auto px-0 md:px-4 mt-20">
        <h2 className="text-lg font-semibold mb-10">BESTSELLER PRODUCTS</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellerProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <ProductCard {...p} subtitle="English Department" />
            </Link>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <img src={hooli} alt="Hooli" className="h-10 opacity-60" />
          <img src={lyft} alt="Lyft" className="h-10 opacity-60" />
          <img src={digeri} alt="Brand" className="h-10 opacity-60" />
          <img src={stripe} alt="Stripe" className="h-10 opacity-60" />
          <img src={aws} alt="AWS" className="h-10 opacity-60" />
          <img src={reddit} alt="Reddit" className="h-10 opacity-60" />
        </div>
      </section>
    </div>
  );
}
