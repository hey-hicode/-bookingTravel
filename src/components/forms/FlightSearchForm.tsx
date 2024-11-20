import { useState } from "react";
import { useFlightStore } from "../../slices/useFlightStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingSpinner from "../common/LoadingSpinner";
import ErrorMessage from "../common/ErrorMessage";

const FlightSearchForm = () => {
  const { fetchFlights, isLoading, error } = useFlightStore();
  const [formData, setFormData] = useState({
    fromId: "",
    toId: "",
    departDate: new Date(),
    returnDate: new Date(Date.now() + 86400000),
    adults: "1",
    children: "0",
    cabinClass: "ECONOMY" as any,
  });
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fromId.trim()) {
      errors.fromId = "Origin is required";
    }

    if (!formData.toId.trim()) {
      errors.toId = "Destination is required";
    }

    if (formData.fromId === formData.toId) {
      errors.toId = "Destination must be different from origin";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (formData.departDate < today) {
      errors.departDate = "Departure date cannot be in the past";
    }

    if (formData.returnDate < formData.departDate) {
      errors.returnDate = "Return date must be after departure date";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await fetchFlights({
        ...formData,
        departDate: formData.departDate.toISOString().split("T")[0],
        returnDate: formData.returnDate.toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Flight search error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="From (City or Airport)"
            className={`p-2 border rounded w-full ${
              validationErrors.fromId ? "border-red-500" : ""
            }`}
            value={formData.fromId}
            onChange={(e) => {
              setFormData({
                ...formData,
                fromId: e.target.value.toUpperCase(),
              });
              setValidationErrors((prev) => ({ ...prev, fromId: "" }));
            }}
          />
          {validationErrors.fromId && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.fromId}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="To (City or Airport)"
            className={`p-2 border rounded w-full ${
              validationErrors.toId ? "border-red-500" : ""
            }`}
            value={formData.toId}
            onChange={(e) => {
              setFormData({ ...formData, toId: e.target.value.toUpperCase() });
              setValidationErrors((prev) => ({ ...prev, toId: "" }));
            }}
          />
          {validationErrors.toId && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.toId}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          selected={formData.departDate}
          onChange={(date) =>
            setFormData({ ...formData, departDate: date || new Date() })
          }
          className="p-2 border rounded w-full"
          placeholderText="Departure Date"
          minDate={new Date()}
          required
        />
        <DatePicker
          selected={formData.returnDate}
          onChange={(date) =>
            setFormData({ ...formData, returnDate: date || new Date() })
          }
          className="p-2 border rounded w-full"
          placeholderText="Return Date"
          minDate={formData.departDate}
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
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
          value={formData.children}
          onChange={(e) =>
            setFormData({ ...formData, children: e.target.value })
          }
          className="p-2 border rounded"
        >
          <option value="0">No Children</option>
          <option value="1">1 Child</option>
          <option value="2">2 Children</option>
          <option value="3">3 Children</option>
        </select>

        <select
          value={formData.cabinClass}
          onChange={(e) =>
            setFormData({ ...formData, cabinClass: e.target.value })
          }
          className="p-2 border rounded"
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
      >
        {isLoading ? <LoadingSpinner /> : "Search Flights"}
      </button>
    </form>
  );
};

export default FlightSearchForm;
