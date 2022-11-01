import { Booking } from "./types";

export const hasOverlap = (booking: Booking, otherBookings: Booking[]) => {
  const { startDate, endDate } = booking;
  if (!otherBookings.length) return false;

  const overlapped = otherBookings.find(
    (other) =>
      (startDate >= other.startDate && startDate <= other.endDate) ||
      (endDate >= other.startDate && endDate <= other.endDate)
  );

  return !!overlapped;
};

export const isIntervalWellDefined = (
  start: number | Date,
  end: number | Date
) => start < end;

export const isBookingAdditionValid = (
  booking: Booking,
  otherBookings: Booking[]
) =>
  !hasOverlap(booking, otherBookings) &&
  isIntervalWellDefined(booking.startDate, booking.endDate);
