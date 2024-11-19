import { FiSearch } from "react-icons/fi";
import { GoChevronDown } from "react-icons/go";
import {
  PiBasket,
  PiBell,
  PiChartPieSlice,
  PiHandCoins,
  PiHouse,
  PiListChecksBold,
  PiPlusSquare,
  PiWallet,
} from "react-icons/pi";
import { useFlightStore } from "../slices/useFlightStore";

const Navbar = () => {
  const { toggleModal } = useFlightStore();

  const handleOpenModal = () => {
    toggleModal(true);
  };

  const linkGroup1 = [
    {
      title: "Home",
      icon: PiHouse,
    },
    {
      title: "Dashboard",
      icon: PiChartPieSlice,
    },
    {
      title: "Wallet",
      icon: PiWallet,
    },
    {
      title: "Plan a trip",
      icon: PiListChecksBold,
    },
    {
      title: "Commission for life",
      icon: PiHandCoins,
    },
  ];

  const linkGroup2 = [
    {
      title: "Notification",
      icon: PiBell,
    },
    {
      title: "Carts",
      icon: PiBasket,
    },
    {
      title: "Create",
      icon: PiPlusSquare,
    },
  ];

  return (
    <div className="px-6 py-5 flex items-center bg-white justify-between sticky top-0 z-10">
      <div className="flex items-center gap-x-4">
        <img
          src="https://cdn.dropp.cloud/q8g3nd.png"
          alt=""
          className="size-10"
        />
        <div className="bg-[#F0F2F5] flex items-center gap-x-3 rounded h-10 px-3 w-[300px]">
          <FiSearch className="text-[#667185]" size={20} />
          <input
            type="text"
            className="bg-transparent"
            onClick={handleOpenModal}
            placeholder="Search"
          />
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-x-5">
          {linkGroup1.map((link, i) => (
            <a href="" key={i} className="flex flex-col items-center">
              <link.icon size={24} className="text-[#667185]" />
              <p className="text-[#647995] text-sm">{link.title}</p>
            </a>
          ))}
        </div>
        <div className="w-[1px] h-10 bg-[#98A2B3] mx-6"></div>
        <button className="h-10 bg-[#0D6EFD] text-white rounded px-3 hover:bg-[#0D6EFD]/90 transition-colors mr-6">
          Subscribe
        </button>
        <div className="flex items-center gap-x-5 mr-3">
          {linkGroup2.map((link, i) => (
            <a href="" key={i} className="flex flex-col items-center">
              <link.icon size={24} className="text-[#667185]" />
              <p className="text-[#647995] text-sm">{link.title}</p>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-x-3">
          <img
            src="https://cdn.dropp.cloud/wsaleq.png"
            className="size-9 rounded-full"
            alt=""
          />
          <GoChevronDown />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
