import { Check, X } from "phosphor-react";
import { useState } from "react";
import { DatePicker } from "../../../components/DatePicker";
import { Booking } from "../types";
import { BookingCardLayout } from "./BookingCardLayout";

export const BookingCardEdit = ({
  booking,
  onSave,
  onCancel,
}: {
  booking: Booking;

  onSave: (booking: Booking) => void;
  onCancel: () => void;
}) => {
  const [name, setName] = useState(booking.name);
  const [startDate, setStartDate] = useState(new Date(booking.startDate));
  const [endDate, setEndDate] = useState(new Date(booking.endDate));

  return (
    <BookingCardLayout
      name={
        <input
          data-testid="name-input"
          className="border border-gray-300 rounded-lg p-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      }
      startDate={
        <DatePicker
          data-testid={`booking-start-date-${booking.id}`}
          editable={true}
          date={startDate}
          onChange={setStartDate}
        />
      }
      endDate={
        <DatePicker
          data-testid={`booking-end-date-${booking.id}`}
          editable={true}
          date={endDate}
          onChange={setEndDate}
        />
      }
      actions={
        <>
          <Check
            data-testid={`save-booking`}
            size={32}
            onClick={() => {
              onSave({
                ...booking,
                name,
                startDate: startDate.getTime(),
                endDate: endDate.getTime(),
              });
            }}
          />
          <X data-testid={`cancel-booking`} size={32} onClick={onCancel} />
        </>
      }
    />
  );
};
