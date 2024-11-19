import { useFlightStore } from "../slices/useFlightStore";
import { useHotelStore } from "../slices/useHotelStore";
import { useActivityStore } from "../slices/useActivityStore";
import LoadingSpinner from "./common/LoadingSpinner";
import ErrorMessage from "./common/ErrorMessage";

interface SearchResultsProps {
  type: "flight" | "hotel" | "activity";
}

const SearchResults = ({ type }: SearchResultsProps) => {
  const {
    flights,
    isLoading: isFlightLoading,
    error: flightError,
    addFlightToItinerary,
  } = useFlightStore();

  const {
    hotels,
    isLoading: isHotelLoading,
    error: hotelError,
    addHotelToItinerary,
  } = useHotelStore();

  const {
    activities,
    isLoading: isActivityLoading,
    error: activityError,
    addActivityToItinerary,
  } = useActivityStore();

  if (type === "flight" && isFlightLoading) return <LoadingSpinner />;
  if (type === "hotel" && isHotelLoading) return <LoadingSpinner />;
  if (type === "activity" && isActivityLoading) return <LoadingSpinner />;

  if (type === "flight" && flightError)
    return <ErrorMessage message={flightError} />;
  if (type === "hotel" && hotelError)
    return <ErrorMessage message={hotelError} />;
  if (type === "activity" && activityError)
    return <ErrorMessage message={activityError} />;

  const renderResults = () => {
    switch (type) {
      case "flight":
        return (
          <div className="space-y-4">
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="border p-4 rounded-lg hover:shadow-md"
              >
                {/* Flight result card content */}
                <button
                  onClick={() => addFlightToItinerary(flight)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add to Itinerary
                </button>
              </div>
            ))}
          </div>
        );

      case "hotel":
        return (
          <div className="grid grid-cols-2 gap-4">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="border p-4 rounded-lg hover:shadow-md"
              >
                {/* Hotel result card content */}
                <button
                  onClick={() => addHotelToItinerary(hotel)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add to Itinerary
                </button>
              </div>
            ))}
          </div>
        );

      case "activity":
        return (
          <div className="grid grid-cols-2 gap-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="border p-4 rounded-lg hover:shadow-md"
              >
                {/* Activity result card content */}
                <button
                  onClick={() => addActivityToItinerary(activity)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add to Itinerary
                </button>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Search Results</h3>
      {renderResults()}
    </div>
  );
};

export default SearchResults;
