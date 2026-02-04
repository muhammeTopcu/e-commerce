import heroImage from "../assets/about/about1.png";
import videoImage from "../assets/about/videocard.png";
import team1 from "../assets/about/team1.jpg";
import team2 from "../assets/about/team2.jpg";
import team3 from "../assets/about/team3.jpg";
import hooli from "../assets/brands/hooli.png";
import lyft from "../assets/brands/lyft.png";
import stripe from "../assets/brands/stripe.png";
import aws from "../assets/brands/aws.png";
import reddit from "../assets/brands/reddit.png";
import digeri from "../assets/brands/digeri.png";
import ctaImage from "../assets/about/work.png";
import { Facebook, Instagram, Twitter } from "lucide-react";

function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-0 md:px-4 pb-12 md:pb-16">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="hidden  md:block text-xs font-semibold uppercase tracking-[0.2em] text-[#737373]">
              About Company
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-[#252B42] leading-tight">
              ABOUT US
            </h1>
            <p className="mt-4 text-sm md:text-base text-[#737373] max-w-md mx-auto md:mx-0">
              We know how large objects will act, but things on a small scale
              just do not act that way.
            </p>
            <button className="mt-7 bg-[#23A6F0] text-white px-7 py-3 text-sm font-semibold">
              Get Quote Now
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative rounded-md overflow-hidden">
              <img
                src={heroImage}
                alt="Shopping"
                className="w-full h-[320px] md:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        {/* Intro */}
        <section className="pb-12 md:w-[1000px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-center md:text-left w-full">
            <div className="flex flex-col items-center md:items-start">
              <span className="text-s font-semibold text-[#E74040]">
                Problems trying
              </span>
              <h3 className="mt-3 text-2xl md:text-3xl font-bold text-[#252B42] leading-snug">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent.
              </h3>
            </div>
            <p className="text-sm md:text-base my-10 text-[#737373] leading-relaxed max-w-sm mx-auto md:mx-0">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 md:py-12 ">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center w-full">
            <div>
              <div className="text-4xl md:text-3xl font-bold text-[#252B42]">
                15K
              </div>
              <div className="mt-2 text-base md:text-sm text-[#737373]">
                Happy Customers
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-3xl font-bold text-[#252B42]">
                150K
              </div>
              <div className="mt-2 text-base md:text-sm text-[#737373]">
                Monthly Visitors
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-3xl font-bold text-[#252B42]">
                15
              </div>
              <div className="mt-2 text-base md:text-sm text-[#737373]">
                Countries Worldwide
              </div>
            </div>
            <div>
              <div className="text-4xl md:text-3xl font-bold text-[#252B42]">
                100+
              </div>
              <div className="mt-2 text-base md:text-sm text-[#737373]">
                Top Partners
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Video Section */}
      <section className="max-w-6xl mx-auto px-0 md:px-4 pb-12 mt-16">
        <div className="relative overflow-hidden rounded-md">
          <img
            src={videoImage}
            alt="Video"
            className="w-full h-[300px] md:h-[550px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-[#23A6F0] flex items-center justify-center shadow-lg"
              onClick={() => {}}
              aria-label="Play video"
            >
              <div className="ml-1 h-0 w-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="max-w-6xl mx-auto px-0 md:px-4 py-10 mt-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42]">
            Meet Our Team
          </h2>
          <p className="mt-3 text-sm text-[#737373] max-w-xl mx-auto">
            Problems trying to resolve the conflict between
          </p>
          <p className="mt-0 text-sm text-[#737373] max-w-xl mx-auto">
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-full overflow-hidden rounded-sm bg-gray-100">
              <img
                src={team1}
                alt="Jerome Bell"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 text-sm font-bold text-[#252B42]">
              Jerome Bell
            </div>
            <div className="mt-1 text-xs text-[#737373]">Profession</div>
            <div className="mt-3 flex items-center justify-center gap-4 text-[#23A6F0]">
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="w-full overflow-hidden rounded-sm bg-gray-100">
              <img
                src={team2}
                alt="Brooklyn Simmons"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 text-sm font-bold text-[#252B42]">
              Brooklyn Simmons
            </div>
            <div className="mt-1 text-xs text-[#737373]">Profession</div>
            <div className="mt-3 flex items-center justify-center gap-4 text-[#23A6F0]">
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          <div className="text-center">
            <div className="w-full overflow-hidden rounded-sm bg-gray-100">
              <img
                src={team3}
                alt="Floyd Miles"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 text-sm font-bold text-[#252B42]">
              Floyd Miles
            </div>
            <div className="mt-1 text-xs text-[#737373]">Profession</div>
            <div className="mt-3 flex items-center justify-center gap-4 text-[#23A6F0]">
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="max-w-6xl mx-auto px-0 md:px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42]">
            Big Companies Are Here
          </h2>
          <p className="mt-3 text-sm text-[#737373] max-w-xl mx-auto">
            Problems trying to resolve the conflict between
          </p>
          <p className="mt-0 text-sm text-[#737373] max-w-xl mx-auto">
            the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="py-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <img src={hooli} alt="Hooli" className="h-10 md:h-12" />
          <img src={lyft} alt="Lyft" className="h-10 md:h-12" />
          <img src={digeri} alt="Brand" className="h-10 md:h-12" />
          <img src={stripe} alt="Stripe" className="h-10 md:h-12" />
          <img src={aws} alt="AWS" className="h-10 md:h-12" />
          <img src={reddit} alt="Reddit" className="h-10 md:h-12" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2A7CC7] -mx-6 md:mx-0">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-stretch gap-10 md:gap-0">
          <div className="w-full text-white flex flex-col items-center justify-center">
            <div className="max-w-xl w-full px-6 md:px-12 py-20 md:py-16 text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                Work with Us
              </span>
              <h2 className="mt-4 text-3xl md:text-3xl font-bold leading-tight">
                Now Let’s grow Yours
              </h2>
              <p className="mt-4 text-sm text-white/85 max-w-sm mx-auto md:mx-0 leading-relaxed">
                The gradual accumulation of information about atomic and
                small-scale behavior during the first quarter of the 20th
              </p>
              <button className="mt-8 border border-white text-white px-8 py-3 text-xs font-semibold mx-auto md:mx-0 rounded-sm">
                Button
              </button>
            </div>
          </div>
          <div className="hidden md:block w-full h-full min-h-[320px] md:min-h-[420px]">
            <img
              src={ctaImage}
              alt="Work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
