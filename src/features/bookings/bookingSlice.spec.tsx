// // The two tests marked with concurrent will be run in parallel
// describe("suite", () => {
//   it("serial test", async () => {
//     /* ... */
//   });
//   it.concurrent("concurrent test 1", async () => {
//     assert(true);
//   });
//   it.concurrent("concurrent test 2", async () => {
//     assert(true);
//   });
// });
import { describe, expect, it, test } from "vitest";
// import { render, screen } from "@testing-library/react";
// import React from "react";
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
    const updatedBooking = {
      id: initialBooking.id,
      name: "New Name",
      startDate: initialBooking.startDate - 100,
      endDate: initialBooking.endDate + 100,
    };
    store.dispatch(editBooking(updatedBooking));

    const { bookings: newBookings } = store.getState().bookings;
    expect(newBookings[0]).toStrictEqual(updatedBooking);
  });

  it("Deletes a booking", () => {
    store.dispatch(removeBooking(initialBooking.id));
    const { bookings: newBookings } = store.getState().bookings;
    expect(newBookings.length).toBe(0);
  });
});
