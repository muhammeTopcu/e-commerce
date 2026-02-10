import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../store/thunks/authThunks";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      await dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        }),
      );
      navigate(from);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-[#252B42] text-center">
          Login
        </h1>
        <p className="mt-2 text-sm text-[#737373] text-center">
          Welcome back
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-semibold text-[#252B42]">
              Email
            </label>
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
              placeholder="Your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input type="checkbox" {...register("remember")} />
            Remember me
          </label>

          <button
            type="submit"
            className="w-full bg-[#23A6F0] text-white py-3 text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
            )}
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2500} />
    </section>
  );
}

export default LoginPage;
