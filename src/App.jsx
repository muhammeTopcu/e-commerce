import { Routes, Route } from "react-router-dom";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";

function App() {
  return (
    <PageContent>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </PageContent>
  );
}

export default App;
