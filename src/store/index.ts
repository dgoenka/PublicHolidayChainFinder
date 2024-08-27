import { create } from "zustand";
import { getCountriesData, getHolidaysData } from "../utils/axios.ts";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export interface HolidayData {
  name: string;
  description: string;
  country: Country;
  date: Date;
  type: string[];
  primary_type: string;
  canonical_url: string;
  urlid: string;
  locations: string;
  states: string;
  gapFromLastHoliday: number;
}

export interface Country {
  id: string;
  name: string;
}

export interface Date {
  iso: string;
  datetime: Datetime;
}

export interface Datetime {
  year: number;
  month: number;
  day: number;
}

interface CountryInfo {
  country_name: string;
  "iso-3166": string;
  total_holidays: number;
  supported_languages: number;
  uuid: string;
  flag_unicode: string;
}

interface YearWiseHolidayData {
  [year: string]: HolidayData[];
}

interface CountryWiseYearWiseHolidayData {
  [country_name: string]: YearWiseHolidayData;
}

interface HolidayStore {
  countryData: CountryInfo[];
  countryWiseYearWiseHolidayData: Partial<CountryWiseYearWiseHolidayData>;
  errorFetchingCountryData: Error | null;
  fetchCountryData: () => Promise<void>;
  fetchHolidayData: (country: string, year: number) => Promise<void>;
}

export const useHolidayStore = create<HolidayStore>()((set, get) => ({
  countryData: [],
  countryWiseYearWiseHolidayData: {},
  errorFetchingCountryData: null,
  fetchCountryData: async () => {
    set({ errorFetchingCountryData: null });
    MySwal.fire({
      title: "Fetching countries data...",
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    try {
      const countriesResponseData = await getCountriesData();

      set({
        countryData: countriesResponseData?.response
          ?.countries as unknown as CountryInfo[],
      });
    } catch (err) {
      set({ errorFetchingCountryData: err as unknown as Error });
    } finally {
      MySwal.close();
    }
    return;
  },
  fetchHolidayData: async (country: string, year: number) => {
    const currentCountryWiseYearWiseHolidayData =
      get().countryWiseYearWiseHolidayData;
    if (!currentCountryWiseYearWiseHolidayData?.[country]?.[year]?.length) {
      const requestData =
        country == "IN" && year === 2024
          ? await import("../dummy/india-2024.json")
          : await getHolidaysData(country, year);

      set({
        countryWiseYearWiseHolidayData: {
          ...currentCountryWiseYearWiseHolidayData,
          [country]: {
            ...(currentCountryWiseYearWiseHolidayData?.[country] || {}),
            [String(year)]: requestData?.response?.holidays || [],
          },
        },
      });
    }
  },
}));
