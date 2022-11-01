import {
  act,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, it, expect } from "vitest";
import { store } from "../../../store";
import { addBooking } from "../bookingsSlice";
import { Bookings } from "./Bookings";

async function addBookingToPage(page: RenderResult) {
  fireEvent.click(await page.findByTestId("add-booking"));
  await waitFor(async () => page.findByTestId("name-input"));
  fireEvent.change(await page.findByTestId("name-input"), {
    target: { value: "test" },
  });
  fireEvent.click(await page.findByTestId("save-booking"));
  await waitFor(async () => page.findByTestId("booking-name-0"));
}

describe("Bookings page", async () => {
  it.concurrent("should edit a booking", async () => {
    store.dispatch(
      addBooking({
        id: "0",
        name: "test",
        startDate: 0,
        endDate: 1,
      })
    );
    const page = render(
      <Provider store={store}>
        <Bookings />
      </Provider>
    );

    await waitFor(async () => page.findByTestId("edit-booking-0"));

    fireEvent.click(await page.findByTestId("edit-booking-0"));

    await waitFor(async () => page.findByTestId("name-input"));

    fireEvent.change(await page.findByTestId("name-input"), {
      target: { value: "test2" },
    });
    fireEvent.click(await page.findByTestId("save-booking"));
    await waitFor(async () => page.findByText("test2"));
  });

  it.concurrent("should add a booking", async () => {
    const page = render(
      <Provider store={store}>
        <Bookings />
      </Provider>
    );
    await addBookingToPage(page);
  });

  it.concurrent("should delete a booking", async () => {
    store.dispatch(
      addBooking({
        id: "0",
        name: "test",
        startDate: 0,
        endDate: 1,
      })
    );
    const page = render(
      <Provider store={store}>
        <Bookings />
      </Provider>
    );
    fireEvent.click(await page.findByTestId("delete-booking-1"));
    expect(page.queryByTestId("delete-booking-1")).toBeFalsy();
    expect(page.queryByTestId("delete-booking-0")).toBeTruthy();
  });
});
