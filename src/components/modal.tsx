import { useFlightStore } from "../slices/useFlightStore";
import { useHotelStore } from "../slices/useHotelStore";
import { useActivityStore } from "../slices/useActivityStore";
import FlightSearchForm from "./forms/FlightSearchForm";
import HotelSearchForm from "./forms/HotelSearchForm";
import ActivitySearchForm from "./forms/ActivitySearchForm";
import SearchResults from "./SearchResults";

const Modal = () => {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[800px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search {currentType}</h2>
          <button onClick={handleClose}>×</button>
        </div>

        {isFlightOpen && <FlightSearchForm />}
        {isHotelOpen && <HotelSearchForm />}
        {isActivityOpen && <ActivitySearchForm />}

        <SearchResults type={currentType} />
      </div>
    </div>
  );
};

export default Modal;
