import axiosInstance from "./axiosInstance";
import { Flight, FlightSearchParams } from "../types/flight";

interface ApiResponse<T> {
  data: T[];
  status: number;
  message?: string;
}

interface HotelSearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: string;
  rooms: string;
  [key: string]: any;
}

interface ActivitySearchParams {
  location: string;
  date: string;
  participants: string;
  category?: string;
  [key: string]: any;
}

export const searchFlight = async (
  params: FlightSearchParams
): Promise<ApiResponse<Flight>> => {
  try {
    const response = await axiosInstance.get("/flights/search", {
      params: {
        ...params,
        currency: "USD",
      },
    });

    // Handle empty or invalid responses
    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Invalid response format");
    }

    return {
      data: response.data.data,
      status: response.data.status || 200,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("No flights found");
    }
    throw new Error(
      error.response?.data?.message || "Failed to search flights"
    );
  }
};

export const searchHotels = async (params: HotelSearchParams) => {
  return axiosInstance.get("/api/v1/hotels/searchHotels", { params });
};

export const searchActivities = async (params: ActivitySearchParams) => {
  return axiosInstance.get("/api/v1/activities/searchActivities", { params });
};
