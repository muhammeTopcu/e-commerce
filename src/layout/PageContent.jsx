import Header from "./Header";
import Footer from "./Footer";

function PageContent({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default PageContent;
