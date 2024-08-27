import axios from "axios";

const axiosInstance = axios.create({
  maxBodyLength: Infinity,
  baseURL: "https://calendarific.com/api/v2",
  headers: {},
  params: {
    api_key: import.meta.env.VITE_CALENDARIFIC_API_KEY,
  },
});

export const getCountriesData = async () => {
  //const { data } = await axiosInstance.get("/countries", {}); // never needed
  return await import("../dummy/country-data.json");
};

export const getHolidaysData = async (country: string, year: number) => {
  const { data } = await axiosInstance.get("/holidays", {
    params: { country, year },
  }); // never needed
  return data;
};
