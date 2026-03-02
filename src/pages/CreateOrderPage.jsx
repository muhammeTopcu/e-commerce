import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createAddress,
  createCard,
  deleteAddress,
  deleteCard,
  fetchAddressList,
  fetchCards,
  updateAddress,
  updateCard,
} from "../store/thunks/clientThunks";
import {
  setAddress,
  setCart,
  setPayment,
} from "../store/actions/shoppingCartActions";
import api from "../api/axiosInstance";

const CITY_OPTIONS = [
  "istanbul",
  "ankara",
  "izmir",
  "bursa",
  "antalya",
  "adana",
  "konya",
];

const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 12 }, (_, i) => CURRENT_YEAR + i);

const maskCardNo = (cardNo = "") => {
  const no = String(cardNo).replace(/\s+/g, "");
  if (no.length < 8) return no;
  return `${no.slice(0, 4)} ${"**** ****"} ${no.slice(-4)}`;
};

function CreateOrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.client.addressList);
  const cards = useSelector((state) => state.client.creditCards);
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const [showCardForm, setShowCardForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [orderCvv, setOrderCvv] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    reset: resetAddressForm,
    formState: { isSubmitting: isAddressSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "istanbul",
      district: "",
      neighborhood: "",
    },
  });

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    reset: resetCardForm,
    formState: { isSubmitting: isCardSubmitting },
  } = useForm({
    defaultValues: {
      card_no: "",
      expire_month: 1,
      expire_year: CURRENT_YEAR,
      name_on_card: "",
      cvv: "",
      use3d: true,
    },
  });

  useEffect(() => {
    dispatch(fetchAddressList())
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          setSelectedShippingId((prev) => prev || list[0].id);
          setSelectedReceiptId((prev) => prev || list[0].id);
        }
      })
      .catch(() => toast.error("Address list could not be loaded."));

    dispatch(fetchCards())
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          setSelectedCardId((prev) => prev || list[0].id);
        }
      })
      .catch(() => toast.error("Card list could not be loaded."));
  }, [dispatch]);

  const productsTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        if (!item.checked) return sum;
        return sum + Number(item?.count || 0) * Number(item?.product?.price || 0);
      }, 0),
    [cart],
  );
  const shippingTotal = productsTotal > 0 ? 29.99 : 0;
  const discount = productsTotal >= 100 ? shippingTotal : 0;
  const grandTotal = productsTotal + shippingTotal - discount;

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowAddressForm(true);
    resetAddressForm({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "istanbul",
      district: "",
      neighborhood: "",
    });
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowAddressForm(true);
    resetAddressForm({
      title: address.title || "",
      name: address.name || "",
      surname: address.surname || "",
      phone: address.phone || "",
      city: address.city || "istanbul",
      district: address.district || "",
      neighborhood: address.neighborhood || "",
    });
  };

  const onSubmitAddress = async (formData) => {
    try {
      if (editingAddress) {
        await dispatch(updateAddress({ id: editingAddress.id, ...formData }));
      } else {
        await dispatch(createAddress(formData));
      }
      setShowAddressForm(false);
      setEditingAddress(null);
    } catch {
      toast.error("Address could not be saved.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId));
      if (selectedShippingId === addressId) setSelectedShippingId(null);
      if (selectedReceiptId === addressId) setSelectedReceiptId(null);
    } catch {
      toast.error("Address could not be deleted.");
    }
  };

  const handleAddCard = () => {
    setEditingCard(null);
    setShowCardForm(true);
    resetCardForm({
      card_no: "",
      expire_month: 1,
      expire_year: CURRENT_YEAR,
      name_on_card: "",
      cvv: "",
      use3d: true,
    });
  };

  const formatCardNumberInput = (value) => {
    const digits = String(value || "")
      .replace(/\D/g, "")
      .slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowCardForm(true);
    resetCardForm({
      card_no: card.card_no || "",
      expire_month: Number(card.expire_month) || 1,
      expire_year: Number(card.expire_year) || CURRENT_YEAR,
      name_on_card: card.name_on_card || "",
      cvv: "",
      use3d: true,
    });
  };

  const onSubmitCard = async (formData) => {
    const payload = {
      card_no: String(formData.card_no).replace(/\s+/g, ""),
      expire_month: Number(formData.expire_month),
      expire_year: Number(formData.expire_year),
      name_on_card: formData.name_on_card,
    };

    try {
      if (editingCard) {
        await dispatch(updateCard({ id: editingCard.id, ...payload }));
      } else {
        await dispatch(createCard(payload));
      }
      setShowCardForm(false);
      setEditingCard(null);
    } catch {
      toast.error("Card could not be saved.");
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await dispatch(deleteCard(cardId));
      if (selectedCardId === cardId) setSelectedCardId(null);
    } catch {
      toast.error("Card could not be deleted.");
    }
  };

  const handleSaveAndContinue = () => {
    const shippingAddress = addressList.find((a) => a.id === selectedShippingId);
    const receiptAddress = sameAsShipping
      ? shippingAddress
      : addressList.find((a) => a.id === selectedReceiptId);

    if (!shippingAddress || !receiptAddress) {
      toast.error("Please select shipping and receipt address.");
      return;
    }

    setSaving(true);
    dispatch(setAddress({ shippingAddress, receiptAddress }));
    setTimeout(() => {
      setSaving(false);
      setCurrentStep(2);
      toast.success("Address information saved.");
    }, 250);
  };

  const handleCreateOrder = async () => {
    const shippingAddress = addressList.find((a) => a.id === selectedShippingId);
    const selectedCard = cards.find((card) => card.id === selectedCardId);
    const selectedProducts = cart.filter((item) => item.checked);

    if (!shippingAddress) {
      toast.error("Please select an address.");
      return;
    }

    if (!selectedCard) {
      toast.error("Please select a card.");
      return;
    }

    if (orderCvv.length !== 3) {
      toast.error("Please enter a valid 3-digit CVV.");
      return;
    }

    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    const payload = {
      address_id: shippingAddress.id,
      order_date: new Date().toISOString().slice(0, 19),
      card_no: String(selectedCard.card_no).replace(/\s+/g, ""),
      card_name: selectedCard.name_on_card,
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(orderCvv),
      price: Number(grandTotal.toFixed(2)),
      products: selectedProducts.map((item) => ({
        product_id: item.product.id,
        count: item.count,
        detail: item?.product?.name || "selected item",
      })),
    };

    try {
      setSaving(true);
      await api.post("/order", payload);
      dispatch(setPayment({}));
      dispatch(setCart([]));
      dispatch(setAddress({}));
      setOrderCvv("");
      setCurrentStep(1);
      toast.success("Congratulations! Your order has been created.", {
        autoClose: 1400,
        onClose: () => navigate("/"),
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Order could not be created.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className={`p-4 text-left border-b md:border-b-0 md:border-r ${
                currentStep === 1 ? "border-b-2 border-b-[#F27A1A]" : ""
              }`}
            >
              <h2 className="text-2xl font-semibold text-[#252B42]">1 Adres Bilgileri</h2>
              <p className="text-sm text-gray-500 mt-1">
                Teslimat ve fatura adresi seciniz.
              </p>
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className={`p-4 text-left ${currentStep === 2 ? "border-b-2 border-b-[#F27A1A]" : ""}`}
            >
              <h2 className="text-2xl font-semibold text-[#252B42]">
                2 Odeme Secenekleri
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Kayitli kartlariniz veya yeni kart ile odeme.
              </p>
            </button>
          </div>

          {currentStep === 1 && (
            <>
              <div className="border rounded-md p-4 mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#252B42]">Teslimat Adresi</h3>
                  <button
                    type="button"
                    onClick={handleAddAddress}
                    className="h-10 px-4 border rounded text-sm hover:bg-gray-50"
                  >
                    Add Address
                  </button>
                </div>

                {showAddressForm && (
                  <form
                    onSubmit={handleSubmitAddress(onSubmitAddress)}
                    className="border rounded-md p-4 space-y-3 mb-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        {...registerAddress("title", { required: true })}
                        placeholder="Address Title"
                        className="border px-3 py-2 text-sm"
                      />
                      <input
                        {...registerAddress("phone", { required: true })}
                        placeholder="Phone"
                        className="border px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        {...registerAddress("name", { required: true })}
                        placeholder="Name"
                        className="border px-3 py-2 text-sm"
                      />
                      <input
                        {...registerAddress("surname", { required: true })}
                        placeholder="Surname"
                        className="border px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <select {...registerAddress("city")} className="border px-3 py-2 text-sm">
                        {CITY_OPTIONS.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <input
                        {...registerAddress("district", { required: true })}
                        placeholder="District"
                        className="border px-3 py-2 text-sm"
                      />
                    </div>
                    <textarea
                      {...registerAddress("neighborhood", { required: true })}
                      placeholder="Neighborhood / Address details"
                      rows={3}
                      className="border px-3 py-2 text-sm w-full"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isAddressSubmitting}
                        className="h-10 px-4 bg-[#23A6F0] text-white text-sm rounded"
                      >
                        {editingAddress ? "Update Address" : "Save Address"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                        }}
                        className="h-10 px-4 border text-sm rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addressList.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-md p-3 ${
                        selectedShippingId === address.id ? "border-[#F27A1A]" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="shippingAddress"
                            checked={selectedShippingId === address.id}
                            onChange={() => setSelectedShippingId(address.id)}
                          />
                          <div>
                            <p className="font-semibold">{address.title}</p>
                            <p className="text-sm text-gray-600">
                              {address.name} {address.surname}
                            </p>
                            <p className="text-sm text-gray-600">{address.phone}</p>
                            <p className="text-sm text-gray-600">
                              {address.district} / {address.city}
                            </p>
                            <p className="text-sm text-gray-600">{address.neighborhood}</p>
                          </div>
                        </label>
                        <div className="flex flex-col items-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditAddress(address)}
                            className="text-xs underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-xs text-red-500 underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-md p-4 mt-4">
                <label className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    checked={sameAsShipping}
                    onChange={(event) => setSameAsShipping(event.target.checked)}
                  />
                  <span className="text-sm">Faturami Ayni Adrese Gonder</span>
                </label>

                {!sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addressList.map((address) => (
                      <label
                        key={`receipt-${address.id}`}
                        className={`border rounded-md p-3 cursor-pointer ${
                          selectedReceiptId === address.id ? "border-[#F27A1A]" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="receiptAddress"
                          checked={selectedReceiptId === address.id}
                          onChange={() => setSelectedReceiptId(address.id)}
                        />
                        <span className="ml-2 font-semibold">{address.title}</span>
                        <p className="text-sm text-gray-600 mt-2">
                          {address.name} {address.surname} - {address.phone}
                        </p>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="border rounded-md p-4 mt-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-semibold text-[#252B42]">Kart Bilgileri</h3>
                <button
                  type="button"
                  onClick={handleAddCard}
                  className="text-base underline text-gray-600"
                >
                  Add New Card
                </button>
              </div>

              {showCardForm && (
                <form
                  onSubmit={handleSubmitCard(onSubmitCard)}
                  className="border rounded-md p-4 space-y-3 mb-4"
                >
                  <input
                    {...registerCard("card_no", { required: true, minLength: 16 })}
                    placeholder="Card Number"
                    className="border px-3 py-3 text-sm w-full"
                    maxLength={19}
                    inputMode="numeric"
                    onInput={(event) => {
                      event.target.value = formatCardNumberInput(event.target.value);
                    }}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select {...registerCard("expire_month")} className="border px-3 py-3 text-sm">
                      {MONTH_OPTIONS.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select {...registerCard("expire_year")} className="border px-3 py-3 text-sm">
                      {YEAR_OPTIONS.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <input
                      {...registerCard("cvv")}
                      placeholder="CVV"
                      className="border px-3 py-3 text-sm"
                      maxLength={3}
                      inputMode="numeric"
                      onInput={(event) => {
                        event.target.value = String(event.target.value)
                          .replace(/\D/g, "")
                          .slice(0, 3);
                      }}
                    />
                  </div>
                  <input
                    {...registerCard("name_on_card", { required: true })}
                    placeholder="Name on Card"
                    className="border px-3 py-3 text-sm w-full"
                  />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" {...registerCard("use3d")} />
                    <span className="text-sm">3D Secure ile odemek istiyorum</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isCardSubmitting}
                      className="h-10 px-4 bg-[#23A6F0] text-white text-sm rounded"
                    >
                      {editingCard ? "Update Card" : "Save Card"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCardForm(false);
                        setEditingCard(null);
                      }}
                      className="h-10 px-4 border text-sm rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {cards.length === 0 ? (
                <p className="text-sm text-gray-500">No saved cards.</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`border rounded-md p-4 cursor-pointer ${
                          selectedCardId === card.id ? "border-[#F27A1A]" : ""
                        }`}
                        onClick={() => setSelectedCardId(card.id)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="savedCard"
                              checked={selectedCardId === card.id}
                              onChange={() => setSelectedCardId(card.id)}
                            />
                            <span className="font-semibold">Saved Card</span>
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleEditCard(card);
                              }}
                              className="text-xs underline"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleDeleteCard(card.id);
                              }}
                              className="text-xs text-red-500 underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-lg font-semibold mt-3">
                          {maskCardNo(card.card_no)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {card.expire_month}/{card.expire_year}
                        </p>
                        <p className="text-sm text-gray-600">{card.name_on_card}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 max-w-[220px]">
                    <label className="block text-sm font-semibold text-[#252B42] mb-1">
                      CVV
                    </label>
                    <input
                      value={orderCvv}
                      onChange={(event) =>
                        setOrderCvv(
                          String(event.target.value).replace(/\D/g, "").slice(0, 3),
                        )
                      }
                      maxLength={3}
                      inputMode="numeric"
                      className="border px-3 py-3 text-sm w-full"
                      placeholder="123"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="border rounded-md p-5 sticky top-6">
            <h2 className="text-2xl text-[#252B42] mb-5">Siparis Ozeti</h2>
            <div className="space-y-3 text-base">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Urunun Toplami</span>
                <span className="font-semibold">${productsTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Kargo Toplam</span>
                <span className="font-semibold">${shippingTotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">100+ Kargo Indirimi</span>
                <span className="font-semibold text-[#E77C40]">
                  -${discount.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t flex items-center justify-between">
              <span className="text-2xl text-[#252B42]">Toplam</span>
              <span className="text-3xl font-bold text-[#E77C40]">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={currentStep === 1 ? handleSaveAndContinue : handleCreateOrder}
              disabled={saving}
              className="mt-6 w-full h-12 bg-[#F27A1A] text-white font-semibold rounded-md disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : currentStep === 1
                  ? "Kaydet ve Devam Et"
                  : "Odeme Yap"}
            </button>
          </div>
        </aside>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </section>
  );
}

export default CreateOrderPage;
