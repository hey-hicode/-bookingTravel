import {
  PiAirplaneTilt,
  PiBuildings,
  PiCaretUpDown,
  PiFirstAidKit,
  PiNewspaperClipping,
  PiPackage,
  PiRoadHorizon,
  PiStudent,
  PiSuitcaseRolling,
} from "react-icons/pi";

const Sidebar = () => {
  const links = [
    {
      title: "Activities",
      icon: PiRoadHorizon,
    },
    {
      title: "Hotels",
      icon: PiBuildings,
    },
    {
      title: "Flights",
      icon: PiAirplaneTilt,
    },
    {
      title: "Study",
      icon: PiStudent,
    },
    {
      title: "Visa",
      icon: PiNewspaperClipping,
    },
    {
      title: "Immigration",
      icon: PiSuitcaseRolling,
    },
    {
      title: "Medical",
      icon: PiFirstAidKit,
    },
    {
      title: "Vacation Packages",
      icon: PiPackage,
    },
  ];
  return (
    <div className="bg-white w-[300px] px-3 py-6 rounded h-fit sticky left-0 top-28">
      <div className="space-y-5">
        {links.map((link, index) => (
          <a href="" key={index} className="flex items-center gap-x-3">
            <link.icon size={24} className="text-[#667185]" />{" "}
            <span className="text-[#647995] text-sm">{link.title}</span>
          </a>
        ))}
      </div>
      <div className="mt-10 bg-[#F0F2F5] rounded flex items-center justify-between p-3">
        <div className="flex items-center gap-x-3">
          <img
            src="https://cdn.dropp.cloud/aauw7n.png"
            className="w-[40px]"
            alt=""
          />
          <p className="text-[#647995] text-sm">Personal Account</p>
        </div>
        <button>
          <PiCaretUpDown className="text-[#667185]" size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
