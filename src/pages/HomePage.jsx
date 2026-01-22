function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      {/*  Slider placeholder */}
      <section className="h-[300px] bg-gray-200 flex items-center justify-center">
        <span className="text-sm">Slider </span>
      </section>

      {/* Editors Pick */}
      <section className="px-4">
        <h2 className="text-lg font-semibold mb-4">Editors Pick</h2>
        <div className="h-[200px] bg-gray-100 flex items-center justify-center">
          <span className="text-sm">Editors Pick </span>
        </div>
      </section>

      {/* Products */}
      <section className="px-4">
        <h2 className="text-lg font-semibold mb-4">Bestseller Products</h2>
        <div className="h-[300px] bg-gray-100 flex items-center justify-center">
          <span className="text-sm">Product Cards</span>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
