import { addDays } from "date-fns";
import { useState } from "react";
import { Booking } from "../types";
import { useAppSelector, useAppDispatch } from "../../../store";
import { BookingCard } from "../components/Booking";
import { addBooking, editBooking, removeBooking } from "../bookingsSlice";
import { hasOverlap, isBookingAdditionValid } from "../validateBooking";

export const Bookings = () => {
  const bookings = useAppSelector((s) => s.bookings.bookings);
  const dispatch = useAppDispatch();

  const [bookingToAdd, setBookingToAdd] = useState<Booking | undefined>();

  const [bookingUnderEdition, setBookingUnderEdition] =
    useState<Booking | null>(null);

  const onClickAdd = () => {
    !bookingToAdd &&
      setBookingToAdd({
        id: bookings.length.toString(),
        name: "",
        endDate: addDays(Date.now(), 7).getTime(),
        startDate: Date.now(),
      });
  };

  const onClickSave = (savedBooking: Booking): void => {
    const otherBookings = bookings.filter(
      (booking) => booking.id !== savedBooking.id
    );
    if (!isBookingAdditionValid(savedBooking, otherBookings)) return;
    setBookingUnderEdition(null);
    dispatch(editBooking(savedBooking));
  };

  const onClickSaveNew = (newBooking: Booking): void => {
    if (!isBookingAdditionValid(newBooking, bookings)) return;
    dispatch(addBooking(newBooking));
    setBookingToAdd(undefined);
  };

  return (
    <div className="flex-1 flex">
      <div className="flex flex-col p-4 flex-1 justify-center items-center gap-2">
        <h1 className="text-3xl font-bold">Bookings</h1>
        <div className="p-2">
          <button
            className="flex flex-row bg-blue-500 text-white p-2 rounded-full hover:bg-blue-700 hover:scale-105 transition-all"
            onClick={onClickAdd}
            data-testid="add-booking"
          >
            Add booking
          </button>
        </div>
        {bookingToAdd && (
          <div className="flex flex-row">
            <BookingCard
              data-testid="add-booking-card"
              onSaved={onClickSaveNew}
              onCancel={() => setBookingToAdd(undefined)}
              isEditing
              booking={bookingToAdd}
            />
          </div>
        )}
        <div className="flex flex-row gap-2 flex-wrap justify-center">
          {bookings.map((b) => (
            <div key={b.id} className="flex flex-row">
              <BookingCard
                onDelete={() => {
                  dispatch(removeBooking(b.id));
                }}
                isEditing={bookingUnderEdition?.id === b.id}
                onSaved={onClickSave}
                onEdit={() => setBookingUnderEdition(b)}
                booking={b}
                onCancel={() => setBookingUnderEdition(null)}
              />
            </div>
          ))}
          {bookings.length % 2 != 0 && <div className="flex flex-1 max-w-25" />}
        </div>
      </div>
    </div>
  );
};
