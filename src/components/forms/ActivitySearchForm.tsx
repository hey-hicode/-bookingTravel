import { useState } from "react";
import { useActivityStore } from "../../slices/useActivityStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../common/LoadingSpinner";

const ActivitySearchForm = () => {
  const { fetchActivities, isLoading, error } = useActivityStore();
  const [formData, setFormData] = useState({
    location: "",
    date: new Date(),
    participants: "2",
    category: "all",
    priceMin: "",
    priceMax: "",
    duration: "any",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchActivities({
      ...formData,
      date: formData.date.toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <input
        type="text"
        placeholder="Enter destination or activity type"
        className="w-full p-2 border rounded"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          selected={formData.date}
          onChange={(date) =>
            setFormData({ ...formData, date: date || new Date() })
          }
          className="p-2 border rounded w-full"
          placeholderText="Select Date"
          minDate={new Date()}
          required
        />

        <select
          value={formData.participants}
          onChange={(e) =>
            setFormData({ ...formData, participants: e.target.value })
          }
          className="p-2 border rounded"
        >
          <option value="1">1 Person</option>
          <option value="2">2 People</option>
          <option value="3">3 People</option>
          <option value="4">4 People</option>
        </select>
      </div>

      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="all">All Categories</option>
        <option value="tours">Tours</option>
        <option value="attractions">Attractions</option>
        <option value="outdoor">Outdoor Activities</option>
        <option value="cultural">Cultural</option>
        <option value="food">Food & Drink</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Min Price"
          className="p-2 border rounded"
          value={formData.priceMin}
          onChange={(e) =>
            setFormData({ ...formData, priceMin: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Max Price"
          className="p-2 border rounded"
          value={formData.priceMax}
          onChange={(e) =>
            setFormData({ ...formData, priceMax: e.target.value })
          }
        />
      </div>

      <select
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="any">Any Duration</option>
        <option value="short">Less than 3 hours</option>
        <option value="medium">3-6 hours</option>
        <option value="long">Full day</option>
        <option value="multi">Multi-day</option>
      </select>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? <LoadingSpinner /> : "Search Activities"}
      </button>
    </form>
  );
};

export default ActivitySearchForm;
