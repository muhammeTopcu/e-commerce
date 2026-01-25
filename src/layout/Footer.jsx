import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Top */}
        <div className="flex justify-between items-center pb-8 border-b">
          <h2 className="text-xl font-bold">Bandage</h2>
          <div className="flex gap-4 text-[#23A6F0]">
            <div className="flex gap-4 text-gray-500">
              <Instagram size={16} />
              <Facebook size={16} />
              <Youtube size={16} />
              <Twitter size={16} />
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-sm text-gray-600 mt-10">
          <div>
            <h4 className="font-semibold mb-3">Company Info</h4>
            <ul className="flex flex-col gap-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="flex flex-col gap-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="flex flex-col gap-2">
              <li>Business Marketing</li>
              <li>User Analytic</li>
              <li>Live Chat</li>
              <li>Unlimited Support</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="flex flex-col gap-2">
              <li>IOS & Android</li>
              <li>Watch a Demo</li>
              <li>Customers</li>
              <li>API</li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="font-semibold mb-3">Get In Touch</h4>

            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="border px-3 py-2 text-sm w-full"
              />
              <button className="bg-[#23A6F0] text-white px-4 py-2 text-sm whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Lore imp sum dolor Amit
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 text-xs text-gray-400">
          Made With Love By Finland All Right Reserved
        </div>
      </div>
    </footer>
  );
}

export default Footer;
