import { Booking } from "../types";
import { BookingCardEdit } from "./BookingCardEdit";
import { BookingCardView } from "./BookingCardView";

interface BookingCardProps {
  booking: Booking;
  isEditing?: boolean;
  onSaved?: (booking: Booking) => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
}
export const BookingCard = ({
  booking,
  isEditing,
  onSaved,
  onEdit: onClickEdit,
  onCancel,
  onDelete,
}: BookingCardProps) => {
  if (isEditing && onSaved && onCancel) {
    return (
      <BookingCardEdit booking={booking} onSave={onSaved} onCancel={onCancel} />
    );
  }
  if (onDelete && onClickEdit)
    return (
      <BookingCardView
        booking={booking}
        onDelete={onDelete}
        onEdit={onClickEdit}
      />
    );
  return <></>;
};
