function ProductCard({ image, title, price }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Image */}
      <div className="bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-[260px] object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center gap-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-sm text-gray-500">{price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
