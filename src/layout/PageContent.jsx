import Header from "./Header";
import Footer from "./Footer";

function PageContent({ children }) {
  return (
    <>
      <Header />
      <main className="px-6 md:px-0">{children}</main>
      <Footer />
    </>
  );
}

export default PageContent;
