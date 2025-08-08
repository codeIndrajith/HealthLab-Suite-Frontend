import React from "react";
import type { IconType } from "react-icons";

interface HIMSTextFieldProps {
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
  ref?: React.Ref<HTMLInputElement>;
}

const HIMSTextField = React.forwardRef<HTMLInputElement, HIMSTextFieldProps>(
  (
    {
      Icon,
      displayLabel,
      isRequired = false,
      placeholderText,
      extraInfo,
      error,
      iconSize = 14,
      classNames,
      isDisabled = false,
      name,
      onChange,
      onBlur,
    },
    ref
  ) => {
    return (
      <div className={`${classNames} flex flex-col gap-2 relative pb-5`}>
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

        <input
          ref={ref}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          type="text"
          placeholder={placeholderText}
          className={`w-full custom-input ${
            error ? "custom-input-error-border-color" : "custom-input-border"
          }`}
          disabled={isDisabled}
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

export default HIMSTextField;
