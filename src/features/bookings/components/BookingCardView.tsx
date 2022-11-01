import { Pen, Trash } from "phosphor-react";
import { DatePicker } from "../../../components/DatePicker";
import { Booking } from "../types";
import { BookingCardLayout } from "./BookingCardLayout";

export const BookingCardView = ({
  booking,
  onDelete,
  onEdit,
}: {
  booking: Booking;
  onDelete: () => void;
  onEdit: () => void;
}) => {
  return (
    <BookingCardLayout
      name={
        <span data-testid={`booking-name-${booking.id}`}>{booking.name}</span>
      }
      startDate={
        <DatePicker
          data-testid={`booking-start-date-${booking.id}`}
          editable={false}
          date={new Date(booking.startDate)}
        />
      }
      endDate={
        <DatePicker
          data-testid={`booking-end-date-${booking.id}`}
          editable={false}
          date={new Date(booking.endDate)}
        />
      }
      actions={
        <>
          <Pen
            data-testid={`edit-booking-${booking.id}`}
            size={32}
            onClick={onEdit}
          />
          <Trash
            data-testid={`delete-booking-${booking.id}`}
            size={32}
            onClick={onDelete}
          />
        </>
      }
    />
  );
};
