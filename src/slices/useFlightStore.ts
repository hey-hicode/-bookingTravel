import { create } from "zustand";
import { persist } from "zustand/middleware";
import { searchFlight } from "../services/api";
import { Flight, FlightSearchParams } from "../types/flight";

interface FlightStore {
  flights: Flight[];
  selectedFlights: Flight[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  searchParams: FlightSearchParams | null;

  setSearchParams: (params: FlightSearchParams) => void;
  fetchFlights: (params: FlightSearchParams) => Promise<void>;
  addFlightToItinerary: (flight: Flight) => void;
  removeFlightFromItinerary: (flightId: string) => void;
  toggleModal: (isOpen: boolean) => void;
  clearSearch: () => void;
}

export const useFlightStore = create(
  persist<FlightStore>(
    (set, get) => ({
      flights: [],
      selectedFlights: [],
      isLoading: false,
      error: null,
      isModalOpen: false,
      searchParams: null,

      setSearchParams: (params) => set({ searchParams: params }),

      fetchFlights: async (params) => {
        try {
          set({ isLoading: true, error: null });
          const response = await searchFlight(params);

          // Ensure response.data exists and is an array
          const flightData = Array.isArray(response?.data) ? response.data : [];

          set({
            flights: flightData,
            searchParams: params,
            isLoading: false,
            error: flightData.length === 0 ? "No flights found" : null,
          });
        } catch (error: any) {
          set({
            error: error.message || "Failed to fetch flights",
            isLoading: false,
            flights: [],
          });
        }
      },

      addFlightToItinerary: (flight) => {
        const { selectedFlights } = get();
        if (!flight?.id) {
          set({ error: "Invalid flight data" });
          return;
        }
        if (selectedFlights.some((f) => f.id === flight.id)) {
          set({ error: "Flight already added to itinerary" });
          return;
        }
        set({
          selectedFlights: [...selectedFlights, flight],
          isModalOpen: false,
          error: null,
        });
      },

      removeFlightFromItinerary: (flightId) => {
        if (!flightId) return;
        set((state) => ({
          selectedFlights: state.selectedFlights.filter(
            (f) => f.id !== flightId
          ),
        }));
      },

      toggleModal: (isOpen) =>
        set({
          isModalOpen: isOpen,
          error: null,
          flights: isOpen ? get().flights : [],
        }),

      clearSearch: () =>
        set({
          flights: [],
          error: null,
          searchParams: null,
        }),
    }),
    {
      name: "flight-storage",
      // partialize: (state: FlightStore) => ({
  // selectedFlights: state.selectedFlights,
// })
    }
  )
);
