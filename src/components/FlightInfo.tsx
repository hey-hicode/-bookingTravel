import { PiAirplaneInFlightBold, PiTrashBold } from "react-icons/pi";
import { useFlightStore } from "../slices/useFlightStore";

const FlightInfo = () => {
  const { selectedFlights, removeFlightFromItinerary } = useFlightStore();

  if (selectedFlights.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No flights added to itinerary yet
      </div>
    );
  }

  return (
    <>
      {selectedFlights.map((flight) => (
        <div key={flight.id} className="bg-white p-4 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className="size-12 rounded bg-[#F0F2F5] flex items-center justify-center">
                <PiAirplaneInFlightBold size={24} />
              </div>
              <div>
                <p className="font-semibold">{flight.airline}</p>
                <p className="text-sm text-[#647995]">
                  {flight.from} → {flight.to}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${flight.price}</p>
              <button
                onClick={() => removeFlightFromItinerary(flight.id)}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-x-1"
              >
                <PiTrashBold />
                Remove
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-[#647995]">
            <p>Departure: {flight.departure_time}</p>
            <p>Duration: {flight.duration}</p>
            <p>Arrival: {flight.arrival_time}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default FlightInfo;
