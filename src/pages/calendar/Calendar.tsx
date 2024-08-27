import "./Calendar.css";
import { useHolidayStore } from "../../store";
import { useSearchParams } from "react-router-dom";
import CountryPicker from "../../common/CountryPicker.tsx";
import { useEffect, useState } from "react";
import {
  calculateDateDifferenceInDays,
  getCurrentOrNextYear,
  getWeekdayName,
  iterateBetweenDates,
} from "../../utils/date.ts";
// @ts-expect-error this is an old library with no type declaration
import { Calendar as CalendarDisplay } from "react-yearly-calendar";
import {
  formatDateInYYYYMMDD,
  iterateOverDaysOfTheYear,
} from "../../utils/date";
import WeekdaysPicker from "../../common/WeekdaysPicker.tsx";
import MaxOffLengthPicker from "../../common/MaxOffLengthPicker.tsx";

interface DayInfo {
  date: Date;
  isHoliday?: boolean;
  isExtendible?: boolean;
  distanceFromLastHoliday?: number;
}

interface YearSnapshot {
  [date: string]: DayInfo;
}

function Calendar() {
  const [WEEKENDS, setWeekends] = useState(["Saturday", "Sunday"]);
  const [MAX_GAP_BETWEEN_HOLIDAYS, setMaxGapBetweenHolidays] = useState(4);
  const holidayStore = useHolidayStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get("country") || "";
  const year = getCurrentOrNextYear();
  const countryYearHolidayData = (
    holidayStore?.countryWiseYearWiseHolidayData?.[country]?.[year] || []
  ).filter((holiday) => (holiday?.type || [])?.includes("National holiday"));
  const holidays = (countryYearHolidayData || []).map((day) => day?.date?.iso);
  const allHolidaysIncludingWeekends: DayInfo[] = [];
  const yearSnapshot: YearSnapshot = {};
  iterateOverDaysOfTheYear(year, (date) => {
    const dateStr = formatDateInYYYYMMDD(date);
    const isHoliday =
      holidays.includes(dateStr) || WEEKENDS.includes(getWeekdayName(date));
    const toPush = { date, isHoliday };
    yearSnapshot[dateStr] = toPush;
    if (isHoliday) {
      allHolidaysIncludingWeekends.push(toPush);
    }
  });
  for (let i = 1; i < allHolidaysIncludingWeekends.length; i++) {
    const currentHoliday = allHolidaysIncludingWeekends[i].date;
    const lastHoliday = allHolidaysIncludingWeekends[i - 1].date;
    const daysDifference = calculateDateDifferenceInDays(
      currentHoliday,
      lastHoliday,
    );

    if (daysDifference > 1 && daysDifference <= MAX_GAP_BETWEEN_HOLIDAYS) {
      const lastHolidayNextDay = new Date(lastHoliday);
      lastHolidayNextDay.setDate(lastHolidayNextDay.getDate() + 1);
      const currentHolidayPreviousDay = new Date(currentHoliday);
      currentHolidayPreviousDay.setDate(
        currentHolidayPreviousDay.getDate() - 1,
      );
      iterateBetweenDates(
        lastHolidayNextDay,
        currentHolidayPreviousDay,
        (date) => {
          const dateStr = formatDateInYYYYMMDD(date);
          yearSnapshot[dateStr].isExtendible = true;
        },
      );
    }
  }
  useEffect(() => {
    if (country) holidayStore.fetchHolidayData(country, year);
  }, [country]);
  const customCSSclasses = {
    holidays,
    weekend: WEEKENDS.join(","),
    extendible: (date: { toDate: () => Date }) =>
      yearSnapshot?.[formatDateInYYYYMMDD(date.toDate())]?.isExtendible,
  };

  return country ? (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          position: "relative",
          zIndex: 99999,
        }}
      >
        <CountryPicker
          onSelect={(country) => setSearchParams({ country: country || "" })}
          defaultValue={country}
        />
        <WeekdaysPicker
          onSelect={(weekends) => setWeekends(weekends)}
          defaultValue={WEEKENDS}
        />
        <MaxOffLengthPicker
          onSelect={(length) => setMaxGapBetweenHolidays(length)}
          defaultValue={MAX_GAP_BETWEEN_HOLIDAYS}
        />
      </div>
      <h1>{year}</h1>
      <CalendarDisplay year={year} customClasses={customCSSclasses} />
    </>
  ) : null;
}

export default Calendar;
