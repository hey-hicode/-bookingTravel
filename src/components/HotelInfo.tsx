import { BiBuildingHouse } from "react-icons/bi";
import { PiTrashBold, PiStarFill } from "react-icons/pi";
import { useHotelStore } from "../slices/useHotelStore";

const HotelInfo = () => {
  const { selectedHotels, removeHotelFromItinerary } = useHotelStore();

  if (selectedHotels.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No hotels added to itinerary yet
      </div>
    );
  }

  return (
    <>
      {selectedHotels.map((hotel) => (
        <div key={hotel.id} className="bg-white p-4 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className="size-12 rounded bg-[#F0F2F5] flex items-center justify-center">
                <BiBuildingHouse size={24} />
              </div>
              <div>
                <p className="font-semibold">{hotel.name}</p>
                <p className="text-sm text-[#647995]">{hotel.location}</p>
                <div className="flex items-center gap-x-1 mt-1">
                  <PiStarFill className="text-yellow-400" size={16} />
                  <span className="text-sm">{hotel.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${hotel.price}/night</p>
              <button
                onClick={() => removeHotelFromItinerary(hotel.id)}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-x-1"
              >
                <PiTrashBold />
                Remove
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-[#647995]">
            <p>Check-in: {hotel.checkIn}</p>
            <p>{hotel.roomType}</p>
            <p>Check-out: {hotel.checkOut}</p>
          </div>
          {hotel.amenities && (
            <div className="mt-2 flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="text-xs text-blue-500">
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default HotelInfo;
