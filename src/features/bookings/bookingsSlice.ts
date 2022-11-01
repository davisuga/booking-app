import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "./types";
import { hasOverlap, hasOverlapOnUpdate } from "./validateBooking";

export interface BookingState {
  bookings: Booking[];
}

const initialState: BookingState = {
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) =>
      hasOverlap(action.payload, state.bookings)
        ? state
        : { ...state, bookings: [...state.bookings, action.payload] },

    removeBooking: (state, action: PayloadAction<Booking["id"]>) => ({
      ...state,
      bookings: state.bookings.filter(
        (booking) => booking.id !== action.payload
      ),
    }),

    editBooking: (
      state,
      action: PayloadAction<{ id: string } & Partial<Booking>>
    ) => {
      const otherBookings = state.bookings.filter(
        (booking) => booking.id !== action.payload.id
      );

      ({
        ...state,
        bookings: state.bookings.map((booking) => {
          if (
            booking.id === action.payload.id &&
            !hasOverlap({ ...booking, ...action.payload }, otherBookings)
          ) {
            return { ...booking, ...action.payload };
          }
          return booking;
        }),
      });
    },
  },
});

export const { addBooking, removeBooking, editBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
