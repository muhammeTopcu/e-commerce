import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import api from "../api/axiosInstance";

const formatMoney = (value) => {
  const amount = Number(value || 0);
  return `$${amount.toFixed(2)}`;
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("tr-TR");
};

const getOrderProducts = (order) => {
  if (Array.isArray(order?.products)) return order.products;
  if (Array.isArray(order?.items)) return order.items;
  if (Array.isArray(order?.order_items)) return order.order_items;
  return [];
};

const getProductName = (item) =>
  item?.product?.name || item?.name || item?.detail || `Product #${item?.product_id || "-"}`;

const getProductImage = (item) => {
  if (item?.product?.images?.[0]?.url) return item.product.images[0].url;
  if (typeof item?.product?.images?.[0] === "string") return item.product.images[0];
  if (item?.product?.image?.url) return item.product.image.url;
  if (typeof item?.product?.image === "string") return item.product.image;
  if (item?.image?.url) return item.image.url;
  if (typeof item?.image === "string") return item.image;
  return "";
};

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);
  const [productMap, setProductMap] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/order");
        const list = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.orders)
            ? response.data.orders
            : [];
        setOrders(list);
      } catch (err) {
        const message =
          err?.response?.data?.message || "Orders could not be loaded.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const productIds = Array.from(
      new Set(
        orders
          .flatMap((order) => getOrderProducts(order))
          .map((item) => item?.product_id ?? item?.product?.id ?? item?.id)
          .filter(Boolean),
      ),
    );

    const missingIds = productIds.filter((id) => !productMap[id]);
    if (missingIds.length === 0) return;

    Promise.all(
      missingIds.map(async (id) => {
        try {
          const response = await api.get(`/products/${id}`);
          return [id, response.data || null];
        } catch {
          return [id, null];
        }
      }),
    ).then((entries) => {
      setProductMap((prev) => {
        const next = { ...prev };
        entries.forEach(([id, product]) => {
          next[id] = product;
        });
        return next;
      });
    });
  }, [orders, productMap]);

  const orderCount = useMemo(() => orders.length, [orders]);

  const toggleExpand = (orderId) => {
    setExpandedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-[#252B42]">My Orders</h1>
        <Link to="/shop" className="text-sm text-[#23A6F0] hover:underline">
          Continue Shopping
        </Link>
      </div>

      {loading && (
        <div className="border rounded-md p-6 text-sm text-gray-500">
          Loading orders...
        </div>
      )}

      {!loading && error && (
        <div className="border border-red-200 bg-red-50 rounded-md p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="mb-4 text-sm text-gray-600">
            {orderCount} order{orderCount === 1 ? "" : "s"} found
          </div>
          {orders.length === 0 ? (
            <div className="border rounded-md p-6 text-sm text-gray-500">
              You have no previous orders yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const orderId = order?.id;
                const products = getOrderProducts(order);
                const expanded = expandedOrderIds.includes(orderId);

                return (
                  <div key={orderId} className="border rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleExpand(orderId)}
                      className="w-full px-4 py-4 bg-[#F9F9F9] flex items-center justify-between text-left"
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full pr-3">
                        <div>
                          <p className="text-xs text-gray-500">Order No</p>
                          <p className="text-sm font-semibold text-[#252B42]">
                            #{orderId}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Date</p>
                          <p className="text-sm text-[#252B42]">
                            {formatDate(order?.order_date)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <p className="text-sm font-semibold text-[#252B42]">
                            {formatMoney(order?.price)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Items</p>
                          <p className="text-sm text-[#252B42]">{products.length}</p>
                        </div>
                      </div>
                      <span className="text-gray-500">
                        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    </button>

                    {expanded && (
                      <div className="px-4 py-4">
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm">
                            <thead>
                              <tr className="border-b text-left text-gray-500">
                                <th className="py-2 pr-3 font-medium">Product</th>
                                <th className="py-2 pr-3 font-medium">Product ID</th>
                                <th className="py-2 pr-3 font-medium">Count</th>
                                <th className="py-2 pr-3 font-medium">Detail</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.length === 0 ? (
                                <tr>
                                  <td
                                    className="py-3 text-gray-500"
                                    colSpan={4}
                                  >
                                    No product detail found for this order.
                                  </td>
                                </tr>
                              ) : (
                                products.map((item, index) => (
                                  <tr key={`${orderId}-${index}`} className="border-b last:border-b-0">
                                    <td className="py-3 pr-3 text-[#252B42]">
                                      {(() => {
                                        const productId =
                                          item?.product_id ?? item?.product?.id ?? item?.id;
                                        const productDetail = productMap[productId] || null;
                                        const image =
                                          getProductImage(item) ||
                                          getProductImage({ product: productDetail });
                                        const name =
                                          getProductName(item) ||
                                          productDetail?.name ||
                                          `Product #${productId || "-"}`;
                                        const content = (
                                          <div className="flex items-center gap-3 min-w-[220px]">
                                            {image ? (
                                              <img
                                                src={image}
                                                alt={name}
                                                className="w-10 h-10 object-cover rounded border"
                                              />
                                            ) : (
                                              <div className="w-10 h-10 rounded border bg-gray-100" />
                                            )}
                                            <span className="line-clamp-2">{name}</span>
                                          </div>
                                        );

                                        if (productId) {
                                          return (
                                            <Link
                                              to={`/product/${productId}`}
                                              className="hover:text-[#23A6F0]"
                                            >
                                              {content}
                                            </Link>
                                          );
                                        }

                                        return content;
                                      })()}
                                    </td>
                                    <td className="py-3 pr-3 text-[#252B42]">
                                      {item?.product_id ?? item?.id ?? "-"}
                                    </td>
                                    <td className="py-3 pr-3 text-[#252B42]">
                                      {item?.count ?? 1}
                                    </td>
                                    <td className="py-3 pr-3 text-gray-600">
                                      {item?.detail || "-"}
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default OrdersPage;
