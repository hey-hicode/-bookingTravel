import { useFlightStore } from "../slices/useFlightStore";
import { useHotelStore } from "../slices/useHotelStore";
import { useActivityStore } from "../slices/useActivityStore";
import FlightSearchForm from "./forms/FlightSearchForm";
import HotelSearchForm from "./forms/HotelSearchForm";
import ActivitySearchForm from "./forms/ActivitySearchForm";
import SearchResults from "./SearchResults";
import { PiX } from "react-icons/pi";

const SearchModal = () => {
  const { isModalOpen: isFlightOpen, toggleModal: toggleFlightModal } =
    useFlightStore();
  const { isModalOpen: isHotelOpen, toggleModal: toggleHotelModal } =
    useHotelStore();
  const { isModalOpen: isActivityOpen, toggleModal: toggleActivityModal } =
    useActivityStore();

  const isOpen = isFlightOpen || isHotelOpen || isActivityOpen;
  const currentType = isFlightOpen
    ? "flight"
    : isHotelOpen
    ? "hotel"
    : "activity";

  const handleClose = () => {
    toggleFlightModal(false);
    toggleHotelModal(false);
    toggleActivityModal(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Search {currentType.charAt(0).toUpperCase() + currentType.slice(1)}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <PiX size={24} />
          </button>
        </div>

        {isFlightOpen && <FlightSearchForm />}
        {isHotelOpen && <HotelSearchForm />}
        {isActivityOpen && <ActivitySearchForm />}

        <SearchResults type={currentType} />
      </div>
    </div>
  );
};

export default SearchModal;
