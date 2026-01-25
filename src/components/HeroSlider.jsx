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
        navigation={{
          nextEl: ".vita-next",
          prevEl: ".vita-prev",
        }}
        autoplay={{ delay: 3500 }}
      >
        <SwiperSlide>
          <div
            className="h-[400px] md:h-[800px] bg-cover bg-center flex items-center "
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="max-w-6xl mx-auto px-6 text-white">
              <span className="text-sm uppercase">SUMMER 2020</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2">
                NEW COLLECTION
              </h2>
              <p className="text-sm mt-4 max-w-md">
                We know how large objects will act, but things on a small scale.
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
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="h-[400px] md:h-[800px] bg-cover bg-center flex items-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="max-w-6xl mx-auto px-6 w-full">
              <div
                className="
        text-white
        max-w-md
        text-center
        md:text-left
        md:ml-0
      "
              >
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
          <div className="h-[400px] md:h-[800px] bg-blue-500 text-white flex flex-col justify-center px-6 md:px-20 gap-4">
            <span className="text-sm uppercase">Winter 2020</span>
            <h2 className="text-2xl font-bold">New Arrivals</h2>
            <button className="bg-white text-blue-600 px-6 py-2 w-fit">
              SHOP NOW
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HeroSlider;
