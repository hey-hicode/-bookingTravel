import { create } from "zustand";
import { persist } from "zustand/middleware";
import { searchHotels } from "../services/api";

interface Hotel {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  images: string[];
  amenities: string[];
  checkIn: string;
  checkOut: string;
  roomType: string;
}

interface HotelStore {
  hotels: Hotel[];
  selectedHotels: Hotel[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  searchParams: any;

  setSearchParams: (params: any) => void;
  fetchHotels: (params: any) => Promise<void>;
  addHotelToItinerary: (hotel: Hotel) => void;
  removeHotelFromItinerary: (hotelId: string) => void;
  toggleModal: (isOpen: boolean) => void;
  clearSearch: () => void;
}

export const useHotelStore = create(
  persist<HotelStore>(
    (set, get) => ({
      hotels: [],
      selectedHotels: [],
      isLoading: false,
      error: null,
      isModalOpen: false,
      searchParams: null,

      setSearchParams: (params) => set({ searchParams: params }),

      fetchHotels: async (params) => {
        try {
          set({ isLoading: true, error: null });
          const response = await searchHotels(params);
          set({
            hotels: response.data.data,
            searchParams: params,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || "Failed to fetch hotels",
            isLoading: false,
            hotels: [],
          });
        }
      },

      addHotelToItinerary: (hotel) =>
        set((state) => ({
          selectedHotels: [...state.selectedHotels, hotel],
        })),

      removeHotelFromItinerary: (hotelId) =>
        set((state) => ({
          selectedHotels: state.selectedHotels.filter((h) => h.id !== hotelId),
        })),

      toggleModal: (isOpen) => set({ isModalOpen: isOpen }),

      clearSearch: () => set({ searchParams: null }),
    }),
    {
      name: "hotel-store",
      version: 1,
    }
  )
);
