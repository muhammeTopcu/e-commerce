import muhammetTopcu from "../assets/team/MuhammetTopcu.jpeg";
import user1 from "../assets/team/user1.jpg";
import user2 from "../assets/team/user2.jpg";
import user3 from "../assets/team/user3.jpg";
import user4 from "../assets/team/user4.jpg";
import user5 from "../assets/team/user5.jpg";
import user6 from "../assets/team/user6.jpg";
import user7 from "../assets/team/user7.jpg";

const teamMembers = [
  {
    name: "Yalçın",
    role: "Project Manager",
    image: user5,
  },
  {
    name: "Muhammet Topcu",
    role: "Full Stack Developer",
    image: muhammetTopcu,
  },
  {
    name: "Jerome Bell",
    role: "IBM",
    image: user1,
  },
  {
    name: "Brooklyn Simmons",
    role: "eBay",
    image: user2,
  },
  {
    name: "Ronald Richards",
    role: "Mitsubishi",
    image: user3,
  },
  {
    name: "Floyd Miles",
    role: "Facebook",
    image: user4,
  },
  {
    name: "Jane Cooper",
    role: "The Walt Disney Company",
    image: user6,
  },
  {
    name: "Robert Fox",
    role: "Starbucks",
    image: user7,
  },
];

function TeamPage() {
  return (
    <section className="max-w-6xl mx-auto px-0 md:px-4 py-16 md:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#252B42]">
          Meet Our Team
        </h2>
        <p className="mt-4 text-sm md:text-base text-[#737373]">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-left">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-gray-100">
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#252B42]">
              {member.name}
            </h3>
            <p className="mt-1 text-xs text-[#737373]">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamPage;
