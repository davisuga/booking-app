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

export const hasOverlapOnUpdate = (
  booking: Booking,
  bookingUpdate: { id: string } & Partial<Booking>,
  otherBookings: Booking[]
) => {
  return !!hasOverlap({ ...booking, ...bookingUpdate }, otherBookings);
};
