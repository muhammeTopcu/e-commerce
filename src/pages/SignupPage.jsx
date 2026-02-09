import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axiosInstance";
import { fetchRolesIfNeeded } from "../store/thunks/clientThunks";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const turkishPhonePattern = /^(?:\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
const taxNoPattern = /^T\d{4}V\d{6}$/;

function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector((state) => state.client.roles);

  const [loadingRoles, setLoadingRoles] = useState(true);
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      role_id: "",
    },
  });

  const selectedRoleId = watch("role_id");
  const passwordValue = watch("password");

  const selectedRole = useMemo(
    () => roles.find((role) => String(role.id) === String(selectedRoleId)),
    [roles, selectedRoleId],
  );

  const isStoreRole = useMemo(() => {
    if (!selectedRole) return false;
    const roleId = Number(selectedRoleId);
    const code = String(selectedRole.code || "").toLowerCase();
    const name = String(selectedRole.name || "").toLowerCase();
    return (
      roleId === 2 ||
      code === "store" ||
      name.includes("store") ||
      name.includes("magaza") ||
      name.includes("mağaza")
    );
  }, [selectedRole, selectedRoleId]);

  useEffect(() => {
    let isActive = true;

    const loadRoles = async () => {
      try {
        await dispatch(fetchRolesIfNeeded());
      } catch (error) {
        const message =
          error?.response?.data?.message || "Roles could not be loaded.";
        setSubmitError(message);
        toast.error(message);
      } finally {
        if (isActive) {
          setLoadingRoles(false);
        }
      }
    };

    loadRoles();
    return () => {
      isActive = false;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!roles.length) return;

    const customerRole =
      roles.find((role) => String(role.code || "").toLowerCase() === "customer") ||
      roles.find((role) =>
        String(role.name || "").toLowerCase().includes("customer"),
      );

    const defaultRole = customerRole || roles[0];

    if (defaultRole && !selectedRoleId) {
      setValue("role_id", defaultRole.id, { shouldValidate: true });
    }
  }, [roles, selectedRoleId, setValue]);

  const onSubmit = async (formData) => {
    setSubmitError("");
    const submittedRole = roles.find(
      (role) => String(role.id) === String(formData.role_id),
    );
    const submittedRoleId = Number(formData.role_id);
    const submittedRoleCode = String(submittedRole?.code || "").toLowerCase();
    const submittedRoleName = String(submittedRole?.name || "").toLowerCase();
    const submittedIsStoreRole =
      submittedRoleId === 2 ||
      submittedRoleCode === "store" ||
      submittedRoleName.includes("store") ||
      submittedRoleName.includes("magaza") ||
      submittedRoleName.includes("mağaza");

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role_id: Number(formData.role_id),
    };

    if (submittedIsStoreRole) {
      payload.store = {
        name: formData.store_name,
        phone: formData.store_phone,
        tax_no: formData.store_tax_no,
        bank_account: formData.store_bank_account?.replace(/\s+/g, ""),
      };
    }

    try {
      await api.post("/signup", payload);
      toast.warn("You need to click link in email to activate your account!");
      setTimeout(() => navigate(-1), 1500);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Signup failed. Please check the form and try again.";
      setSubmitError(message);
      toast.error(message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-[#252B42] text-center">
          Sign Up
        </h1>
        <p className="mt-2 text-sm text-[#737373] text-center">
          Create a new account
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold text-[#252B42]">Name</label>
            <input
              className="mt-2 w-full border px-3 py-2 text-sm"
              type="text"
              placeholder="Your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-[#252B42]">Email</label>
            <input
              className="mt-2 w-full border px-3 py-2 text-sm"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-[#252B42]">
              Password
            </label>
            <input
              className="mt-2 w-full border px-3 py-2 text-sm"
              type="password"
              placeholder="At least 8 characters"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: passwordPattern,
                  message:
                    "Must include upper, lower, number, and special character",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-[#252B42]">
              Confirm Password
            </label>
            <input
              className="mt-2 w-full border px-3 py-2 text-sm"
              type="password"
              placeholder="Repeat password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
            />
            {errors.confirm_password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold text-[#252B42]">Role</label>
            <select
              className="mt-2 w-full border px-3 py-2 text-sm"
              disabled={loadingRoles}
              {...register("role_id")}
            >
              <option value="" disabled>
                {loadingRoles ? "Loading roles..." : "Select role"}
              </option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {isStoreRole && (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-[#252B42]">
                  Store Name
                </label>
                <input
                  className="mt-2 w-full border px-3 py-2 text-sm"
                  type="text"
                  placeholder="Store name"
                  {...register("store_name", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters",
                    },
                  })}
                />
                {errors.store_name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.store_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#252B42]">
                  Store Phone
                </label>
                <input
                  className="mt-2 w-full border px-3 py-2 text-sm"
                  type="text"
                  placeholder="+90 5xx xxx xx xx"
                  {...register("store_phone", {
                    required: "Store phone is required",
                    pattern: {
                      value: turkishPhonePattern,
                      message: "Enter a valid Turkiye phone number",
                    },
                  })}
                />
                {errors.store_phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.store_phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#252B42]">
                  Store Tax ID
                </label>
                <input
                  className="mt-2 w-full border px-3 py-2 text-sm"
                  type="text"
                  placeholder="T1234V123456"
                  {...register("store_tax_no", {
                    required: "Store tax ID is required",
                    pattern: {
                      value: taxNoPattern,
                      message: "Tax ID must match TXXXXVXXXXXX format",
                    },
                  })}
                />
                {errors.store_tax_no && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.store_tax_no.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#252B42]">
                  Store Bank Account (IBAN)
                </label>
                <input
                  className="mt-2 w-full border px-3 py-2 text-sm"
                  type="text"
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                  {...register("store_bank_account", {
                    required: "IBAN is required",
                    validate: (value) => {
                      const cleaned = String(value).replace(/\s+/g, "");
                      return (
                        /^TR\d{24}$/.test(cleaned) || "Enter a valid TR IBAN"
                      );
                    },
                  })}
                />
                {errors.store_bank_account && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.store_bank_account.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {submitError && (
            <p className="text-sm text-red-500" role="alert">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#23A6F0] text-white py-3 text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
            )}
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </section>
  );
}

export default SignupPage;
