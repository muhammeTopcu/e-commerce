import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
  toggleCartItemChecked,
} from "../store/actions/shoppingCartActions";

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

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shoppingCart.cart);

  const selectedTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        if (!item.checked) return sum;
        return sum + Number(item?.count || 0) * Number(item?.product?.price || 0);
      }, 0),
    [cart],
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-[#252B42] mb-6">
        Sepetim ({cart.length} Urun)
      </h1>

      {cart.length === 0 ? (
        <div className="border rounded-md p-8 text-center text-gray-500">
          Sepet bos.
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.product.id} className="border rounded-md overflow-hidden">
              <div className="bg-[#E7F5EE] text-[#23856D] text-sm text-center py-2 font-semibold">
                Kargo Bedava!
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                <div className="md:col-span-1 flex justify-center">
                  <input
                    type="checkbox"
                    checked={Boolean(item.checked)}
                    onChange={() => dispatch(toggleCartItemChecked(item.product.id))}
                    className="h-5 w-5"
                  />
                </div>

                <div className="md:col-span-1">
                  <img
                    src={getCartImage(item.product)}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover border rounded"
                  />
                </div>

                <div className="md:col-span-4">
                  <h3 className="font-semibold text-[#252B42]">{item.product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Stock: {item.product.stock ?? "-"}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <div className="inline-flex items-center border rounded">
                    <button
                      type="button"
                      onClick={() => dispatch(decrementCartItem(item.product.id))}
                      className="px-3 py-1 text-xl text-gray-500 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{item.count}</span>
                    <button
                      type="button"
                      onClick={() => dispatch(incrementCartItem(item.product.id))}
                      className="px-3 py-1 text-xl text-gray-500 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 text-right">
                  <p className="text-2xl text-[#E77C40] font-semibold">
                    ${(Number(item.product.price) * Number(item.count || 0)).toFixed(2)}
                  </p>
                </div>

                <div className="md:col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => dispatch(removeCartItem(item.product.id))}
                    className="text-gray-500 hover:text-red-500 text-xl"
                    aria-label="Remove item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="border rounded-md p-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-[#252B42]">
              Secili Urunler Toplami
            </span>
            <span className="text-2xl font-bold text-[#23A6F0]">
              ${selectedTotal.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;
