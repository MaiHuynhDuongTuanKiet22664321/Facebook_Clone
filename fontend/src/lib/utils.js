import { clsx } from "clsx";
import { formatDistanceToNow, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formateDate = (date) =>{
  const options = { year: "numeric", month: "long", day: "numeric" };
  return formatDistanceToNow(parseISO(date),{addSuffix: true});
}

export const  formatDateInDDMMYYY = (date) =>{
  return new Date(date).toLocaleDateString('en-GB')
}


