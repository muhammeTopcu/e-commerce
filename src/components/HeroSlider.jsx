import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
          <div className="h-[400px] md:h-[600px] bg-blue-500 text-white flex flex-col justify-center px-6 md:px-20 gap-4">
            <span className="text-sm uppercase">Summer 2020</span>
            <h2 className="text-2xl font-bold">New Collection</h2>
            <p className="text-sm max-w-xs">
              We know how large objects will act, but things on a small scale.
            </p>
            <button className="bg-white text-blue-500 px-6 py-2 w-fit">
              SHOP NOW
            </button>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-[400px] md:h-[600px] bg-blue-500 text-white flex flex-col justify-center px-6 md:px-20 gap-4">
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
