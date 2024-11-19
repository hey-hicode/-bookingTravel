import { useState } from "react";
import { useHotelStore } from "../../slices/useHotelStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../common/LoadingSpinner";

const HotelSearchForm = () => {
  const { fetchHotels, isLoading, error } = useHotelStore();
  const [formData, setFormData] = useState({
    location: "",
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 86400000), // Tomorrow
    adults: "2",
    rooms: "1",
    priceMin: "",
    priceMax: "",
    rating: "any",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchHotels({
      ...formData,
      checkIn: formData.checkIn.toISOString().split("T")[0],
      checkOut: formData.checkOut.toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <input
        type="text"
        placeholder="Enter destination or hotel name"
        className="w-full p-2 border rounded"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          selected={formData.checkIn}
          onChange={(date) =>
            setFormData({ ...formData, checkIn: date || new Date() })
          }
          className="p-2 border rounded w-full"
          placeholderText="Check-in Date"
          minDate={new Date()}
          required
        />
        <DatePicker
          selected={formData.checkOut}
          onChange={(date) =>
            setFormData({ ...formData, checkOut: date || new Date() })
          }
          className="p-2 border rounded w-full"
          placeholderText="Check-out Date"
          minDate={formData.checkIn}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <select
          value={formData.adults}
          onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="1">1 Adult</option>
          <option value="2">2 Adults</option>
          <option value="3">3 Adults</option>
          <option value="4">4 Adults</option>
        </select>

        <select
          value={formData.rooms}
          onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
          className="p-2 border rounded"
        >
          <option value="1">1 Room</option>
          <option value="2">2 Rooms</option>
          <option value="3">3 Rooms</option>
          <option value="4">4 Rooms</option>
        </select>
      </div>

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
        value={formData.rating}
        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        className="w-full p-2 border rounded"
      >
        <option value="any">Any Rating</option>
        <option value="5">5 Stars</option>
        <option value="4">4+ Stars</option>
        <option value="3">3+ Stars</option>
      </select>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? <LoadingSpinner /> : "Search Hotels"}
      </button>
    </form>
  );
};

export default HotelSearchForm;
