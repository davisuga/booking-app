import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Booking } from "./types";
import { isBookingAdditionValid } from "./validateBooking";

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
      !isBookingAdditionValid(action.payload, state.bookings)
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

      return {
        ...state,
        bookings: state.bookings.map((booking) => {
          const shouldUpdate =
            booking.id === action.payload.id &&
            isBookingAdditionValid(
              { ...booking, ...action.payload },
              otherBookings
            );

          return shouldUpdate ? { ...booking, ...action.payload } : booking;
        }),
      };
    },
  },
});

export const { addBooking, removeBooking, editBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
