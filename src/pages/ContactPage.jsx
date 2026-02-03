import contactbackground from "../assets/contact/contactbackground.png";

function ContactPage() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[900px] overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url(${contactbackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 h-full grid grid-cols-1 md:grid-cols-2 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col gap-6 text-center md:text-left mt-32 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              CONTACT US
            </h1>

            <p className="text-base md:text-lg max-w-md mx-auto md:mx-0 text-white/90">
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>

            <button className="bg-[#23A6F0] text-white px-10 py-4 text-sm md:text-base font-semibold w-fit mx-auto md:mx-0">
              CONTACT US
            </button>
          </div>

          {/* RIGHT – LOCATIONS (DESKTOP) */}
          <div className="hidden md:flex justify-end">
            <div className="grid grid-cols-2 gap-x-20 gap-y-12 text-base text-white">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Paris</h3>
                <p>1901 Thorn ridge Cir.</p>
                <p className="font-semibold">75000 Paris</p>
                <p>Phone : +451 215 215</p>
                <p>Fax : +451 215 215</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-lg">New York</h3>
                <p>2715 Ash Dr. San Jose</p>
                <p className="font-semibold">75000 Paris</p>
                <p>Phone : +451 215 215</p>
                <p>Fax : +451 215 215</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Berlin</h3>
                <p>4140 Parker Rd.</p>
                <p className="font-semibold">75000 Paris</p>
                <p>Phone : +451 215 215</p>
                <p>Fax : +451 215 215</p>
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold text-lg">London</h3>
                <p>3517 W. Gray St. Utica</p>
                <p className="font-semibold">75000 Paris</p>
                <p>Phone : +451 215 215</p>
                <p>Fax : +451 215 215</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE LOCATIONS */}
        <div className="relative z-10 md:hidden px-6 pb-20 space-y-12 text-base text-white">
          {[
            ["Paris", "1901 Thorn ridge Cir."],
            ["Berlin", "4140 Parker Rd."],
            ["New York", "2715 Ash Dr. San Jose"],
            ["London", "3517 W. Gray St. Utica"],
          ].map(([city, addr]) => (
            <div key={city} className="space-y-1">
              <h3 className="font-semibold text-lg">{city}</h3>
              <p>{addr}</p>
              <p className="font-semibold">75000 Paris</p>
              <p>Phone : +451 215 215</p>
              <p>Fax : +451 215 215</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
