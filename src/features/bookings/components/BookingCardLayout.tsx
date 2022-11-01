interface BookingCardLayoutProps {
  name: React.ReactNode;
  startDate: React.ReactNode;
  endDate: React.ReactNode;
  actions: React.ReactNode;
  errorMessage?: React.ReactNode;
  "data-testid"?: string;
}

export const BookingCardLayout = ({
  name,
  startDate,
  endDate,
  actions,
  errorMessage,
  ...props
}: BookingCardLayoutProps) => {
  return (
    <div
      data-testid={props["data-testid"]}
      className="flex flex-col bg-white rounded-lg shadow-lg p-4"
    >
      <div className="flex flex-col justify-between gap-2">
        {name}
        <div className="flex items-center gap-2 flex-row">
          {errorMessage}
          <div className="flex items-center gap-2">
            {startDate}
            {" to "}
            {endDate}
          </div>

          {actions}
        </div>
      </div>
    </div>
  );
};
