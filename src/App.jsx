import { Routes, Route } from "react-router-dom";
import PageContent from "./layout/PageContent";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <PageContent>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </PageContent>
  );
}

export default App;
