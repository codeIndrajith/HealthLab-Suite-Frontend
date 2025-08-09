import React from "react";
import type { IconType } from "react-icons";

interface HIMSEmailFieldProps {
  Icon?: IconType;
  displayLabel?: string;
  isRequired?: boolean;
  placeholderText?: string;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  classNames?: string;
  isDisabled?: boolean;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  autoComplete?: string;
}

const HIMSEmailField = React.forwardRef<HTMLInputElement, HIMSEmailFieldProps>(
  (
    {
      Icon,
      displayLabel,
      isRequired = false,
      placeholderText = "Enter your email",
      extraInfo,
      error,
      iconSize = 14,
      classNames,
      isDisabled = false,
      name = "email",
      onChange,
      onBlur,
      value,
      autoComplete = "email",
    },
    ref
  ) => {
    return (
      <div className={`${classNames} flex flex-col gap-2 relative pb-5`}>
        {(displayLabel || Icon) && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-primary" fontSize={iconSize} />}
            <label className="text-sm text-label">
              {displayLabel || "Email"}{" "}
              {isRequired && <span className="text-red-600">*</span>}
            </label>
          </div>
        )}

        {extraInfo && (
          <small className="text-xs text-gray-500">{extraInfo}</small>
        )}

        <input
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type="email"
          placeholder={placeholderText}
          className={`w-full rounded-md text-sm p-2  ${
            error ? "border border-red-500" : "border border-gray-200"
          }`}
          disabled={isDisabled}
          value={value}
          autoComplete={autoComplete}
        />

        {error && (
          <small className="absolute bottom-1 left-0 text-red-500 text-[11px]">
            {error}
          </small>
        )}
      </div>
    );
  }
);

HIMSEmailField.displayName = "HIMSEmailField";

export default HIMSEmailField;
