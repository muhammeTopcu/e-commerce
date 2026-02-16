import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import hooli from "../assets/brands/hooli.png";
import lyft from "../assets/brands/lyft.png";
import digeri from "../assets/brands/digeri.png";
import stripe from "../assets/brands/stripe.png";
import aws from "../assets/brands/aws.png";
import reddit from "../assets/brands/reddit.png";
import category1 from "../assets/shopPageCategories/1.png";
import category2 from "../assets/shopPageCategories/2.png";
import category3 from "../assets/shopPageCategories/3.png";
import category4 from "../assets/shopPageCategories/4.png";
import category5 from "../assets/shopPageCategories/5.png";
import productPlaceholder from "../assets/product/1.png";
import { fetchProducts } from "../store/thunks/productThunks";
import { setFilter, setSort } from "../store/actions/productActions";

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

const fallbackCategoryImages = [
  category1,
  category2,
  category3,
  category4,
  category5,
];

const getProductImage = (product) => {
  if (Array.isArray(product?.images) && product.images.length > 0) {
    const firstImage = product.images[0];
    if (typeof firstImage === "string") return firstImage;
    if (firstImage?.url) return firstImage.url;
  }

  if (typeof product?.images === "string") {
    try {
      const parsed = JSON.parse(product.images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const firstImage = parsed[0];
        if (typeof firstImage === "string") return firstImage;
        if (firstImage?.url) return firstImage.url;
      }
    } catch {
      // Ignore parse error and continue with other image fields.
    }
  }

  return (
    product?.image?.url ||
    product?.image_url ||
    product?.image ||
    product?.img ||
    productPlaceholder
  );
};

function ShopPage() {
  const dispatch = useDispatch();
  const { gender, categoryName, categoryId } = useParams();
  const { categories, productList, fetchState, limit, offset, filter, sort } =
    useSelector((state) => state.product);

  const [filterInput, setFilterInput] = useState(filter || "");
  const [sortInput, setSortInput] = useState(sort || "");

  useEffect(() => {
    setFilterInput(filter || "");
  }, [filter]);

  useEffect(() => {
    setSortInput(sort || "");
  }, [sort]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        categoryId,
        limit,
        offset,
        filter,
        sort,
      }),
    ).catch((error) => {
      console.error("Failed to fetch products:", error);
    });
  }, [dispatch, categoryId, limit, offset, filter, sort]);

  const handleApplyFilters = () => {
    dispatch(setFilter(filterInput.trim()));
    dispatch(setSort(sortInput));
  };

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

      <section>
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          <h3 className="text-base font-semibold text-[#252B42] mb-3">
            All Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-[#252B42] mb-2">
                Kadin
              </h4>
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
              <h4 className="text-sm font-semibold text-[#252B42] mb-2">
                Erkek
              </h4>
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

      <section className="border-b mt-6">
        <div className="max-w-6xl mx-auto px-0 md:px-4 py-6 md:py-8">
          <div className="max-w-6xl mx-auto px-0 md:px-4 py-6 flex items-center justify-between text-sm">
            <span className="text-[#BDBDBD] text-base text-xs">
              Showing all {productList.length} results
            </span>

            <div className="flex items-center gap-3">
              <span className="text-[#BDBDBD] font-semibold">Views:</span>
              <button
                type="button"
                className="h-8 px-3 border border-[#E6E6E6] text-xs text-[#252B73] hover:border-[#23A6F0] hover:text-[#23A6F0] transition"
              >
                Kart
              </button>
              <button
                type="button"
                className="h-8 px-3 border border-[#E6E6E6] text-xs text-[#BDBDBD] hover:border-[#23A6F0] hover:text-[#23A6F0] transition"
              >
                Liste
              </button>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              <input
                type="text"
                value={filterInput}
                onChange={(event) => setFilterInput(event.target.value)}
                placeholder="Filter products"
                className="h-11 w-[160px] md:w-[220px] border border-[#E6E6E6] px-3 text-sm text-[#737373] focus:outline-none"
              />

              <select
                value={sortInput}
                onChange={(event) => setSortInput(event.target.value)}
                className="h-11 min-w-[170px] border border-[#E6E6E6] px-3 text-sm text-[#BDBDBD] focus:outline-none"
              >
                <option value="">Popularity</option>
                <option value="price:asc">price:asc</option>
                <option value="price:desc">price:desc</option>
                <option value="rating:asc">rating:asc</option>
                <option value="rating:desc">rating:desc</option>
              </select>

              <button
                type="button"
                onClick={handleApplyFilters}
                className="h-11 px-8 text-white text-sm font-semibold rounded-md"
                style={{ backgroundColor: "#33A0E5" }}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="max-w-6xl mx-auto px-0 md:px-4">
          {fetchState === "FETCHING" && (
            <div className="py-10 flex items-center justify-center">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#23A6F0]/60 border-t-transparent" />
            </div>
          )}

          {fetchState !== "FETCHING" && productList.length === 0 && (
            <p className="text-center text-sm text-gray-500 py-10">
              No products found.
            </p>
          )}

          {fetchState !== "FETCHING" && productList.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {productList.map((product, index) => (
                <Link
                  key={product.id || `${product.name}-${index}`}
                  to={`/product/${product.id}`}
                  className="block"
                >
                  <ProductCard
                    image={getProductImage(product)}
                    title={product.name || product.title || "Product"}
                    subtitle={product.category?.name || "English Department"}
                    price={`$${product.price ?? "0.00"}`}
                    oldPrice={
                      product.oldPrice ? `$${product.oldPrice}` : undefined
                    }
                    colors={["#23A6F0", "#23856D", "#E77C40", "#252B42"]}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="pb-8">
        <div className="flex justify-center items-center gap-2 text-sm">
          <button className="px-3 py-2 border text-gray-400">Prev</button>
          <button className="px-3 py-2 border bg-blue-500 text-white">1</button>
          <button className="px-3 py-2 border text-gray-600">2</button>
          <button className="px-3 py-2 border text-gray-600">Next</button>
        </div>
      </section>

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
