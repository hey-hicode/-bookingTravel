// @ts-ignore

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { searchActivities } from "../services/api";
// import { Flight } from "../types/flight";

interface Activity {
  id: string;
  name: string;
  location: string;
  price: number;
  duration: string;
  date: string;
  description: string;
  category: string;
  rating: number;
  images: string[];
}

interface ActivityStore {
  activities: Activity[];
  selectedActivities: Activity[];
  isLoading: boolean;
  error: string | null;
  isModalOpen: boolean;
  searchParams: any;

  setSearchParams: (params: any) => void;
  fetchActivities: (params: any) => Promise<void>;
  addActivityToItinerary: (activity: Activity) => void;
  removeActivityFromItinerary: (activityId: string) => void;
  toggleModal: (isOpen: boolean) => void;
  clearSearch: () => void;
}

export const useActivityStore = create(
  persist<ActivityStore>(
    (set, get) => ({
      activities: [],
      selectedActivities: [],
      isLoading: false,
      error: null,
      isModalOpen: false,
      searchParams: null,

      setSearchParams: (params) => set({ searchParams: params }),

      fetchActivities: async (params) => {
        try {
          set({ isLoading: true, error: null });
          const response = await searchActivities(params);
          set({
            activities: response.data.data,
            searchParams: params,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || "Failed to fetch activities",
            isLoading: false,
            activities: [],
          });
        }
      },

      addActivityToItinerary: (activity) => {
        const { selectedActivities } = get();
        if (selectedActivities.some((a) => a.id === activity.id)) {
          set({ error: "Activity already added to itinerary" });
          return;
        }
        set({
          selectedActivities: [...selectedActivities, activity],
          isModalOpen: false,
          error: null,
        });
      },

      removeActivityFromItinerary: (activityId) => {
        set((state) => ({
          selectedActivities: state.selectedActivities.filter(
            (a) => a.id !== activityId
          ),
        }));
      },

      toggleModal: (isOpen) =>
        set({
          isModalOpen: isOpen,
          error: null,
          activities: isOpen ? get().activities : [],
        }),

      clearSearch: () =>
        set({
          activities: [],
          error: null,
          searchParams: null,
        }),
    }),
    {
      name: "activity-storage",
      // partialize: (state) => ({ selectedActivities: state.selectedActivities }),
    }
  )
);
