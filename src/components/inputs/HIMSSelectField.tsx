/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { IconType } from "react-icons";

interface HIMSSelectFieldProps<T, U> {
  Icon?: IconType;
  displayLabel: string; // required prop
  options: T[]; // required prop
  optionKey: U;
  optionDisplayText: U;
  optionValue: U;
  isRequired?: boolean;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  isDefaultOptionRequired?: boolean;
  defaultOptionText?: string;
  classNames?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.ChangeEventHandler<HTMLSelectElement>;
  ref?: React.Ref<HTMLSelectElement>;
  isDisabled?: boolean;
}

const HIMSSelectField = React.forwardRef<
  HTMLSelectElement,
  HIMSSelectFieldProps<any, any>
>(
  <T extends object, U extends keyof T>(
    {
      Icon,
      displayLabel,
      options,
      optionKey,
      optionDisplayText,
      optionValue,
      isRequired,
      extraInfo,
      error,
      iconSize,
      isDefaultOptionRequired = false,
      defaultOptionText = "--select a value--",
      classNames,
      name,
      onChange,
      onBlur,
      isDisabled,
    }: HIMSSelectFieldProps<T, U>,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const selectableOptions = options.map((option) => (
      <option
        key={String(option[optionKey])}
        value={String(option[optionValue])}
      >
        {String(option[optionDisplayText])}
      </option>
    ));

    if (isDefaultOptionRequired) {
      selectableOptions.unshift(
        <option key="42725278-04a6-4dbe-8dc5-76d026e4c0b7" value="">
          {defaultOptionText}
        </option>
      );
    }

    return (
      <div className={`${classNames} flex flex-col gap-2 relative pb-5`}>
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              className="text-[${iconSize}px] text-primary"
              fontSize={iconSize}
            />
          )}
          <label className="text-sm text-label">
            {displayLabel}{" "}
            {isRequired && <span className="text-red-600">*</span>}
          </label>
        </div>

        {extraInfo && <small>{extraInfo}</small>}

        <select
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          disabled={isDisabled}
          className={`px-5 py-2 text-sm h-[40px] min-h-[40px] max-h-[40px] ${
            error ? "custom-input-error-border-color" : "custom-input-border"
          } no-scrollbar`}
        >
          {selectableOptions}
        </select>

        {error && (
          <small className="absolute bottom-1 left-0 custom-error-text-color custom-error-text-size">
            {error}
          </small>
        )}
      </div>
    );
  }
);

export default HIMSSelectField;
