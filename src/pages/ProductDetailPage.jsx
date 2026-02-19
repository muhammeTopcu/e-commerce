import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "../components/ProductCard";
import { fetchProductById } from "../store/thunks/productThunks";
import api from "../api/axiosInstance";
import hooli from "../assets/brands/hooli.png";
import lyft from "../assets/brands/lyft.png";
import stripe from "../assets/brands/stripe.png";
import aws from "../assets/brands/aws.png";
import reddit from "../assets/brands/reddit.png";
import digeri from "../assets/brands/digeri.png";
import detailHead from "../assets/productdetail/head.jpg";
import detailThumb2 from "../assets/productdetail/thumbnail2.png";

const getImageUrl = (image) => {
  if (!image) return "";
  if (typeof image === "string") return image;
  if (typeof image === "object" && image.url) return image.url;
  return "";
};

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState("description");
  const [activeSlide, setActiveSlide] = useState(0);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId, id } = useParams();
  const resolvedProductId = productId || id;

  const { productDetail, productDetailFetchState } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProductById(resolvedProductId)).catch((error) => {
      console.error("Failed to fetch product detail:", error);
    });
  }, [dispatch, resolvedProductId]);

  useEffect(() => {
    api
      .get("/products?limit=8&offset=0")
      .then((response) => {
        const list = Array.isArray(response?.data?.products)
          ? response.data.products
          : [];
        setBestsellerProducts(list);
      })
      .catch((error) => {
        console.error("Failed to fetch bestseller products:", error);
        setBestsellerProducts([]);
      });
  }, []);

  const images = useMemo(() => {
    const apiImages = Array.isArray(productDetail?.images)
      ? productDetail.images
          .slice()
          .sort((a, b) => Number(a?.index || 0) - Number(b?.index || 0))
          .map(getImageUrl)
          .filter(Boolean)
      : [];

    if (apiImages.length > 0) return apiImages;
    return [detailHead];
  }, [productDetail]);

  const ratingValue = Number(productDetail?.rating || 0);
  const ratingStars = Math.round(ratingValue);

  return (
    <div className="flex flex-col">
      <section className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex items-center justify-between">
          <div>
            <span className="text-[#252B42]">Home</span>
            <span className="mx-2">{">"}</span>
            <span>Shop</span>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 border text-[#252B42] hover:bg-white"
          >
            Back
          </button>
        </div>
      </section>

      {productDetailFetchState === "FETCHING" && (
        <div className="py-20 flex items-center justify-center">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#23A6F0]/60 border-t-transparent" />
        </div>
      )}

      {productDetailFetchState === "FAILED" && (
        <p className="py-10 text-center text-sm text-red-500">
          Product detail could not be loaded.
        </p>
      )}

      {productDetailFetchState === "FETCHED" && productDetail && (
        <>
          <section className="py-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 px-4">
              <div className="w-full md:w-1/2">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setActiveSlide(swiper.realIndex);
                  }}
                  onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                  className="w-full"
                >
                  {images.map((img, i) => (
                    <SwiperSlide key={`${img}-${i}`}>
                      <img
                        src={img}
                        alt={`product-${i}`}
                        className="w-full h-[55vh] md:h-[500px] object-contain rounded-lg bg-white"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {images.length > 1 && (
                  <div className="flex gap-4 mt-4">
                    {images.slice(0, 4).map((img, i) => (
                      <button
                        key={`${img}-thumb-${i}`}
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
                          className={`w-20 h-20 object-contain bg-white ${
                            activeSlide === i ? "opacity-75 blur-[0.4px]" : ""
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:w-1/2 flex flex-col gap-4">
                <h1 className="text-xl font-semibold text-[#252B42]">
                  {productDetail.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i <= ratingStars ? "text-yellow-500" : "text-gray-300"}
                        fill={i <= ratingStars ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{ratingValue.toFixed(2)}</span>
                </div>
                <p className="text-2xl font-bold">${productDetail.price}</p>
                <div className="flex items-center gap-1 text-sm">
                  <span>Availability :</span>
                  <span className={productDetail.stock > 0 ? "text-blue-600" : "text-red-500"}>
                    {productDetail.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{productDetail.description}</p>

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

          <section className="max-w-6xl mx-auto px-4 mt-16">
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
                  src={images[activeSlide] || images[0] || detailThumb2}
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

          <section className="max-w-6xl mx-auto px-4 mt-20">
            <h2 className="text-lg font-semibold mb-10">BESTSELLER PRODUCTS</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestsellerProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <ProductCard
                    image={getImageUrl(Array.isArray(p.images) ? p.images[0] : p.image)}
                    title={p.name || p.title}
                    subtitle="English Department"
                    price={`$${p.price ?? "0.00"}`}
                    oldPrice={p.oldPrice ? `$${p.oldPrice}` : undefined}
                    colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                  />
                </Link>
              ))}
            </div>
          </section>

          <section className="py-8">
            <div className="max-w-6xl mx-auto py-8 flex flex-col md:flex-row justify-between items-center gap-10 px-4">
              <img src={hooli} alt="Hooli" className="h-10 opacity-60" />
              <img src={lyft} alt="Lyft" className="h-10 opacity-60" />
              <img src={digeri} alt="Brand" className="h-10 opacity-60" />
              <img src={stripe} alt="Stripe" className="h-10 opacity-60" />
              <img src={aws} alt="AWS" className="h-10 opacity-60" />
              <img src={reddit} alt="Reddit" className="h-10 opacity-60" />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
