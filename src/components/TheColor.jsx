import { createContext } from "react";
import { pickColor } from "../functions/FetchFromGist";

export function daysBetween(date) {
  const releaseDay = "04/22/2022";
  const today = new Date(date);
  const formatToday = getFormattedDate(today).toString();

  const daysBetween = (
    new Date(releaseDay) -
    new Date(formatToday)
  );
  return Math.ceil(daysBetween);
}

//from: https://stackoverflow.com/questions/11591854/format-date-to-mm-dd-yyyy-in-javascript
export function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return month + "/" + day + "/" + year;
}

export async function fetchColor(date) {
  const picked = await pickColor(date);
  if (picked) {
    return picked;
  } else {
    return "0,0,0";
  }
}

export const TheColor = createContext();
export const TheDay = createContext();

// export const TheColor = createContext("rgba(205,130,200,1)");
// export const TheColor = createContext("rgba(0,0,0,1)");
