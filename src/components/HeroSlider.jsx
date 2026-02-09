import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import heroImage from "../assets/heroslider/heroSlider1.jpg";

function HeroSlider() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3500 }}
      >
        <SwiperSlide>
          <div
            className="h-[480px] md:h-[1000px] bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="max-w-6xl mx-auto px-6 w-full h-full flex items-center md:grid md:grid-cols-2">
              <div className="text-white max-w-md text-center md:text-left md:justify-self-center md:col-start-1">
                <span className="text-sm uppercase">SUMMER 2020</span>

                <h2 className="text-3xl md:text-5xl font-bold mt-2">
                  NEW COLLECTION
                </h2>

                <p className="text-sm mt-4">
                  We know how large objects will act, but things on a small
                  scale.
                </p>

                <button
                  className="
                    mt-6
                    bg-[#2DC071]
                    text-white
                    px-6
                    py-2
                    w-fit
                    mx-auto
                    md:mx-0
                    text-sm
                    font-semibold
                  "
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-[480px] md:h-[1000px] bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="max-w-6xl mx-auto px-6 w-full h-full flex items-center md:grid md:grid-cols-2">
              <div className="text-white max-w-md text-center md:text-left md:justify-self-center md:col-start-1">
                <span className="text-sm uppercase">SUMMER 2020</span>

                <h2 className="text-3xl md:text-5xl font-bold mt-2">
                  NEW COLLECTION
                </h2>

                <p className="text-sm mt-4">
                  We know how large objects will act, but things on a small
                  scale.
                </p>

                <button
                  className="
                    mt-6
                    bg-[#2DC071]
                    text-white
                    px-6
                    py-2
                    w-fit
                    mx-auto
                    md:mx-0
                    text-sm
                    font-semibold
                  "
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HeroSlider;
