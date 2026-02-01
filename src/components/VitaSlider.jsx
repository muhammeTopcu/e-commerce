import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import vitaslider1 from "../assets/vitaslider/vitaslider1.png";

function VitaSlider() {
  return (
    <section className="bg-[#23856D] text-white">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3500 }}
      >
        {/* SLIDE */}
        <SwiperSlide>
          <div className="min-h-[520px] md:min-h-[700px] flex items-end">
            <div className="max-w-6xl mx-auto w-full px-6 md:px-0">
              <div className="flex flex-col md:flex-row justify-between">
                {/* LEFT – TEXT (DİKEY ORTALI) */}
                <div className="flex flex-col justify-center gap-4 text-center md:text-left max-w-md min-h-[520px] md:min-h-[700px]">
                  <span className="text-sm uppercase tracking-wide">
                    Summer 2020
                  </span>

                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Vita Classic <br /> Product
                  </h2>

                  <p className="text-sm opacity-90">
                    We know how large objects will act, We know how are objects
                    will act, We know
                  </p>

                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <span className="text-lg font-bold">$16.48</span>
                    <button className="bg-[#2DC071] text-white px-6 py-3 text-sm font-semibold">
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* RIGHT – IMAGE (ALT SIFIR) */}
                <div className="flex items-end">
                  <img
                    src={vitaslider1}
                    alt="Vita Product"
                    className="max-h-[520px] md:max-h-[700px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="min-h-[520px] md:min-h-[700px] flex items-end">
            <div className="max-w-6xl mx-auto w-full px-6 md:px-0">
              <div className="flex flex-col md:flex-row justify-between">
                {/* LEFT – TEXT (DİKEY ORTALI) */}
                <div className="flex flex-col justify-center gap-4 text-center md:text-left max-w-md min-h-[520px] md:min-h-[700px]">
                  <span className="text-sm uppercase tracking-wide">
                    Summer 2020
                  </span>

                  <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                    Vita Classic <br /> Product
                  </h2>

                  <p className="text-sm opacity-90">
                    We know how large objects will act, We know how are objects
                    will act, We know
                  </p>

                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <span className="text-lg font-bold">$16.48</span>
                    <button className="bg-[#2DC071] text-white px-6 py-3 text-sm font-semibold">
                      ADD TO CART
                    </button>
                  </div>
                </div>

                {/* RIGHT – IMAGE (ALT SIFIR) */}
                <div className="flex items-end">
                  <img
                    src={vitaslider1}
                    alt="Vita Product"
                    className="max-h-[520px] md:max-h-[700px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default VitaSlider;
