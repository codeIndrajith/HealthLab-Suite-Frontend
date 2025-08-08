import React, { useEffect, useLayoutEffect, useState } from "react";
import type { IconType } from "react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface HIMSDateFieldProps {
  Icon?: IconType;
  displayLabel?: string;
  isRequired?: boolean;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  classNames?: string;
  maxDate?: Date;
  minDate?: Date;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  // onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  ref?: React.Ref<HTMLInputElement>;
  isTypeDisable?: boolean;
  defaultDate?: string;
  isDisabled?: boolean;
}

const parseDateString = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // Local date, month is 0-based
};

const HIMSDateField = React.forwardRef<HTMLInputElement, HIMSDateFieldProps>(
  (
    {
      Icon,
      displayLabel,
      isRequired = false,
      extraInfo,
      error,
      iconSize = 14,
      classNames,
      maxDate,
      minDate,
      name,
      onChange,
      onBlur,
      isTypeDisable = false,
      defaultDate,
      isDisabled = false,
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const isFirstRender = React.useRef<boolean>(true);

    // state for selected date
    const [selectedDate, setSelectedDate] = useState<Date | null>(
      defaultDate ? parseDateString(defaultDate) : null
    );
    //let maxDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - 1900 + 1 },
      (_, idx) => 1900 + idx
    );

    const months = Array.from({ length: 12 }, (_, idx) =>
      new Date(0, idx).toLocaleString("default", { month: "long" })
    );

    useLayoutEffect(() => {
      if (!selectedDate && internalRef.current?.value) {
        setSelectedDate(parseDateString(internalRef.current.value));
      }
    }, [selectedDate, internalRef.current?.value]);

    useEffect(() => {
      if (onChange && selectedDate) {
        if (isFirstRender.current) {
          isFirstRender.current = false;
        }
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const syntheticEvent = {
          target: {
            name,
            value: `${year}-${month}-${day}`, // Local date, no timezone shift // yyyy-mm-dd
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
      if (!isFirstRender.current && onChange && !selectedDate) {
        const syntheticEvent = {
          target: {
            name,
            value: "",
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    }, [selectedDate]);

    return (
      <div
        className={`${classNames} flex flex-col gap-2 relative pb-5 max-h-max`}
      >
        {(displayLabel || Icon) && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-primary" fontSize={iconSize} />}
            <label className="text-sm text-label">
              {displayLabel}{" "}
              {isRequired && <span className="text-red-600">*</span>}
            </label>
          </div>
        )}

        {extraInfo && <small>{extraInfo}</small>}

        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          onBlur={onBlur}
          disabled={isDisabled}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="YYYY-MM-DD (select or type a date)"
          dateFormat="yyyy-MM-dd"
          className={`w-full custom-input ${
            error ? "custom-input-error-border-color" : "custom-input-border"
          }`}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="w-[350px]  md:w-[500px] flex flex-col items-center justify-between px-3 pb-3">
              <div className="w-full flex items-center justify-between mb-3">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full bg-white w-6 h-6"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  <BiChevronLeft fontSize={20} />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full bg-white w-6 h-6"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  <BiChevronRight fontSize={20} />
                </button>
              </div>
              <div className="flex flex-col gap-2 w-full rounded-md">
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) =>
                    changeYear(Number(value))
                  }
                  className="flex-1 cursor-pointer p-2 rounded-md"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  value={months[date.getMonth()]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                  className="flex-1 cursor-pointer p-2 rounded-md"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        />

        <input
          type="hidden"
          ref={(element) => {
            internalRef.current = element;
            if (typeof ref === "function") {
              ref(element);
            } else if (ref) {
              (ref as React.MutableRefObject<HTMLInputElement | null>).current =
                element;
            }
          }}
          name={name}
          //value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
          value={
            selectedDate
              ? `${selectedDate.getFullYear()}-${String(
                  selectedDate.getMonth() + 1
                ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
                  2,
                  "0"
                )}`
              : ""
          }
          readOnly

          // disabled={isDisabled}
          // onChange={onChange}
          // onBlur={onBlur}
          // onKeyDown={isTypeDisable ? (e) => e.preventDefault() : undefined}
          // defaultValue={defaultDate}
          // type="date"
          // min={
          //   minDate
          //     ? `${minDate.getFullYear()}-${(minDate.getMonth() + 1).toString().length === 1
          //       ? `0${minDate.getMonth() + 1}`
          //       : minDate.getMonth() + 1
          //     }-${minDate.getDate().toString().length === 1
          //       ? `0${minDate.getDate()}`
          //       : minDate.getDate()
          //     }`
          //     : undefined
          // }
          // max={
          //   maxDate
          //     ? `${maxDate.getFullYear()}-${(maxDate.getMonth() + 1).toString().length === 1
          //       ? `0${maxDate.getMonth() + 1}`
          //       : maxDate.getMonth() + 1
          //     }-${maxDate.getDate().toString().length === 1
          //       ? `0${maxDate.getDate()}`
          //       : maxDate.getDate()
          //     }`
          //     : undefined
          // }
          // className={`w-full custom-input ${error ? "custom-input-error-border-color" : "custom-input-border"
          //   }`}
        />

        {error && (
          <small className="absolute bottom-1 left-0 custom-error-text-color custom-error-text-size">
            {error}
          </small>
        )}
      </div>
    );
  }
);

export default HIMSDateField;
