import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createAddress,
  deleteAddress,
  fetchAddressList,
  updateAddress,
} from "../store/thunks/clientThunks";
import { setAddress } from "../store/actions/shoppingCartActions";

const CITY_OPTIONS = [
  "istanbul",
  "ankara",
  "izmir",
  "bursa",
  "antalya",
  "adana",
  "konya",
];

function CreateOrderPage() {
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.client.addressList);
  const cart = useSelector((state) => state.shoppingCart.cart);

  const [selectedShippingId, setSelectedShippingId] = useState(null);
  const [selectedReceiptId, setSelectedReceiptId] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
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

  useEffect(() => {
    dispatch(fetchAddressList())
      .then((list) => {
        if (Array.isArray(list) && list.length > 0) {
          setSelectedShippingId((prev) => prev || list[0].id);
          setSelectedReceiptId((prev) => prev || list[0].id);
        }
      })
      .catch(() => {
        toast.error("Address list could not be loaded.");
      });
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

  const handleAddNew = () => {
    setEditingAddress(null);
    setShowForm(true);
    reset({
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "istanbul",
      district: "",
      neighborhood: "",
    });
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
    reset({
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
        await dispatch(
          updateAddress({
            id: editingAddress.id,
            ...formData,
          }),
        );
      } else {
        await dispatch(createAddress(formData));
      }
      setShowForm(false);
      setEditingAddress(null);
    } catch {
      toast.error("Address could not be saved.");
    }
  };

  const handleDelete = async (addressId) => {
    try {
      await dispatch(deleteAddress(addressId));
      if (selectedShippingId === addressId) setSelectedShippingId(null);
      if (selectedReceiptId === addressId) setSelectedReceiptId(null);
    } catch {
      toast.error("Address could not be deleted.");
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
    dispatch(
      setAddress({
        shippingAddress,
        receiptAddress,
      }),
    );
    setTimeout(() => {
      setSaving(false);
      toast.success("Address information saved.");
    }, 300);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <div className="border rounded-md p-4">
            <h1 className="text-2xl font-semibold text-[#252B42]">1 Adres Bilgileri</h1>
            <p className="text-sm text-gray-500 mt-1">
              Teslimat ve fatura adresi seciniz.
            </p>
          </div>

          <div className="border rounded-md p-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[#252B42]">Teslimat Adresi</h2>
              <button
                type="button"
                onClick={handleAddNew}
                className="h-10 px-4 border rounded text-sm hover:bg-gray-50"
              >
                Add Address
              </button>
            </div>

            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmitAddress)}
                className="border rounded-md p-4 space-y-3 mb-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    {...register("title", { required: true })}
                    placeholder="Address Title"
                    className="border px-3 py-2 text-sm"
                  />
                  <input
                    {...register("phone", { required: true })}
                    placeholder="Phone"
                    className="border px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    {...register("name", { required: true })}
                    placeholder="Name"
                    className="border px-3 py-2 text-sm"
                  />
                  <input
                    {...register("surname", { required: true })}
                    placeholder="Surname"
                    className="border px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <select {...register("city")} className="border px-3 py-2 text-sm">
                    {CITY_OPTIONS.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <input
                    {...register("district", { required: true })}
                    placeholder="District"
                    className="border px-3 py-2 text-sm"
                  />
                </div>
                <textarea
                  {...register("neighborhood", { required: true })}
                  placeholder="Neighborhood / Address details"
                  rows={3}
                  className="border px-3 py-2 text-sm w-full"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 px-4 bg-[#23A6F0] text-white text-sm rounded"
                  >
                    {editingAddress ? "Update Address" : "Save Address"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
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
                        onClick={() => handleEdit(address)}
                        className="text-xs underline"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(address.id)}
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
              onClick={handleSaveAndContinue}
              disabled={saving}
              className="mt-6 w-full h-12 bg-[#F27A1A] text-white font-semibold rounded-md disabled:opacity-60"
            >
              {saving ? "Saving..." : "Kaydet ve Devam Et"}
            </button>
          </div>
        </aside>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
    </section>
  );
}

export default CreateOrderPage;
