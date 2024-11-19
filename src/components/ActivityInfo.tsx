import { MdOutlineLocalActivity } from "react-icons/md";
import { PiTrashBold, PiStarFill } from "react-icons/pi";
import { useActivityStore } from "../slices/useActivityStore";

const ActivityInfo = () => {
  const { selectedActivities, removeActivityFromItinerary } =
    useActivityStore();

  if (selectedActivities.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No activities added to itinerary yet
      </div>
    );
  }

  return (
    <>
      {selectedActivities.map((activity) => (
        <div key={activity.id} className="bg-white p-4 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <div className="size-12 rounded bg-[#F0F2F5] flex items-center justify-center">
                <MdOutlineLocalActivity size={24} />
              </div>
              <div>
                <p className="font-semibold">{activity.name}</p>
                <p className="text-sm text-[#647995]">{activity.location}</p>
                <div className="flex items-center gap-x-1 mt-1">
                  <PiStarFill className="text-yellow-400" size={16} />
                  <span className="text-sm">{activity.rating}/5</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${activity.price}</p>
              <button
                onClick={() => removeActivityFromItinerary(activity.id)}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-x-1"
              >
                <PiTrashBold />
                Remove
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-[#647995]">
            <p>Date: {activity.date}</p>
            <p>Duration: {activity.duration}</p>
            <p>Category: {activity.category}</p>
          </div>
          {activity.description && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {activity.description}
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default ActivityInfo;
