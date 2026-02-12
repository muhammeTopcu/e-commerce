import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import heroImage from "../assets/heroslider/heroSlider1.jpg";

const slides = [
  {
    id: 1,
    image: heroImage,
    season: "SUMMER 2020",
    title: "NEW COLLECTION",
    description: "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
  },
  {
    id: 2,
    image: heroImage,
    season: "SUMMER 2020",
    title: "NEW COLLECTION",
    description: "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
  },
];

function HeroSlider() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3500 }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-[480px] md:h-[600px] bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="max-w-6xl mx-auto px-6 w-full h-full flex items-center md:grid md:grid-cols-2">
                <div className="text-white max-w-md text-center md:text-left md:justify-self-center md:col-start-1">
                  <span className="text-sm uppercase">{slide.season}</span>

                  <h2 className="text-3xl md:text-5xl font-bold mt-2">
                    {slide.title}
                  </h2>

                  <p className="text-sm mt-4">{slide.description}</p>

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
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSlider;
