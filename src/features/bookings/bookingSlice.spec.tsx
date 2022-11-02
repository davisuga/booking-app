import { describe, expect, it, test } from "vitest";
import { store } from "../../store";
import { addBooking, editBooking, removeBooking } from "./bookingsSlice";
import { addDays } from "date-fns/fp";

const add5Days = addDays(5);

describe("Booking state", () => {
  const initialBooking = {
    id: Math.random().toString(),
    name: "test",
    endDate: add5Days(Date.now()).getTime(),
    startDate: Date.now(),
  };
  const initialState = store.getState().bookings;

  it("Adds a booking", () => {
    store.dispatch(addBooking(initialBooking));
    const { bookings: newBookings } = store.getState().bookings;
    expect(initialState.bookings.length).toBeLessThan(newBookings.length);
    expect(newBookings).toContainEqual(initialBooking);
  });

  it("Does not accept overlapping bookings", () => {
    const id = Math.random().toString();
    const overlappingStart = initialBooking.endDate - 100;

    store.dispatch(
      addBooking({
        id,
        name: "test",
        endDate: add5Days(overlappingStart).getTime(),
        startDate: overlappingStart,
      })
    );
    const { bookings: newBookings } = store.getState().bookings;
    expect(newBookings.length).toBe(1);
  });

  it("Updates a booking", () => {
    const oldState = store.getState().bookings.bookings;

    const updatedBooking = {
      id: initialBooking.id,
      name: "New Name",
      startDate: initialBooking.startDate - 100,
      endDate: initialBooking.endDate + 100,
    };
    store.dispatch(editBooking(updatedBooking));

    const { bookings: newBookings } = store.getState().bookings;

    expect(newBookings[0].name).not.toStrictEqual(oldState[0].name);
  });

  it("Deletes a booking", () => {
    store.dispatch(removeBooking(initialBooking.id));
    const { bookings: newBookings } = store.getState().bookings;
    expect(newBookings.length).toBe(0);
  });
});
