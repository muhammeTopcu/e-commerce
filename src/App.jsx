import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import { verifyStoredToken } from "./store/thunks/authThunks";
import { fetchCategoriesIfNeeded } from "./store/thunks/productThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyStoredToken()).catch(() => {
      // Failed token verification is handled in thunk by clearing auth data.
    });
    dispatch(fetchCategoriesIfNeeded()).catch((error) => {
      console.error("Failed to fetch categories:", error);
    });
  }, [dispatch]);

  return (
    <PageContent>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<ProductDetailPage />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </PageContent>
  );
}

export default App;
