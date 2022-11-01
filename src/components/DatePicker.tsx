import { format } from "date-fns/fp";
import { useState } from "react";
import { Calendar } from "react-date-range";
import { usePopper } from "react-popper";

const formatDate = format("dd/MM/yyyy");

interface DatePickerProps {
  date: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  editable?: boolean;
  "data-testid"?: string;
}
export const DatePicker = ({
  date,
  onChange,
  maxDate,
  minDate,
  editable,
  ...props
}: DatePickerProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);

  const [popperElement, setPopperElement] =
    useState<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  if (!editable)
    return (
      <div data-testid={props["data-testid"]} className="text-lg py-1">
        {formatDate(date)}
      </div>
    );

  return (
    <div>
      <div
        className="text-lg"
        onClick={(e) => {
          setOpen(!open);
          setReferenceElement(e.currentTarget);
        }}
        data-testid={props["data-testid"]}
      >
        {formatDate(date)}
      </div>
      <div
        className="drop-shadow-md"
        style={styles.popper}
        {...attributes.popper}
        ref={setPopperElement}
      >
        {open && (
          <Calendar
            maxDate={maxDate}
            minDate={minDate}
            date={date}
            onChange={(e) => {
              setOpen(false);
              onChange?.(e);
            }}
          />
        )}
      </div>
    </div>
  );
};
