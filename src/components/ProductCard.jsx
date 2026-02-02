function ProductCard({ image, title, subtitle, price, oldPrice, colors = [] }) {
  return (
    <div className="group block cursor-pointer">
      <div className="flex flex-col gap-3">
        {/* IMAGE */}
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-[360px] object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* HOVER OVERLAY */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              View Details
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-1 text-center">
          <h3 className="text-sm font-semibold text-[#252B42] group-hover:text-[#23A6F0] transition">
            {title}
          </h3>

          {subtitle && (
            <span className="text-xs text-gray-500">{subtitle}</span>
          )}

          {/* PRICE */}
          <div className="flex items-center justify-center gap-2 text-sm">
            {oldPrice && (
              <span className="text-gray-400 line-through">{oldPrice}</span>
            )}
            <span className="text-[#23856D] font-semibold">{price}</span>
          </div>

          {/* COLORS */}
          {colors.length > 0 && (
            <div className="flex justify-center gap-2 mt-2">
              {colors.map((color, index) => (
                <span
                  key={index}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
