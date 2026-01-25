import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function VitaSlider() {
  return (
    <section className="bg-[#23856D] text-white py-16">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3500 }}
      >
        <SwiperSlide>
          <div className="max-w-6xl mx-auto px-6 md:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* LEFT – TEXT */}
              <div className="flex flex-col gap-4 text-center md:text-left max-w-md">
                <span className="text-sm uppercase tracking-wide">
                  Summer 2020
                </span>

                <h2 className="text-3xl font-bold leading-tight">
                  Vita Classic Product
                </h2>

                <p className="text-sm opacity-90">
                  We know how large objects will act, We know how are objects
                  will act, We know
                </p>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <span className="text-lg font-bold">$16.48</span>
                  <button className="bg-white text-[#23856D] px-6 py-3 text-sm font-semibold">
                    ADD TO CART
                  </button>
                </div>
              </div>

              {/* RIGHT – IMAGE */}
              <div className="flex justify-center">
                <img
                  src="https://picsum.photos/500/600?50"
                  alt="Vita Product"
                  className="max-w-[420px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="max-w-6xl mx-auto px-6 md:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              {/* LEFT – TEXT */}
              <div className="flex flex-col gap-4 text-center md:text-left max-w-md">
                <span className="text-sm uppercase tracking-wide">
                  Summer 2020
                </span>

                <h2 className="text-3xl font-bold leading-tight">
                  Vita Classic Product
                </h2>

                <p className="text-sm opacity-90">
                  We know how large objects will act, We know how are objects
                  will act, We know
                </p>

                <div className="flex items-center gap-4 justify-center md:justify-start">
                  <span className="text-lg font-bold">$16.48</span>
                  <button className="bg-white text-[#23856D] px-6 py-3 text-sm font-semibold">
                    ADD TO CART
                  </button>
                </div>
              </div>

              {/* RIGHT – IMAGE */}
              <div className="flex justify-center">
                <img
                  src="https://picsum.photos/500/600?50"
                  alt="Vita Product"
                  className="max-w-[420px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default VitaSlider;
