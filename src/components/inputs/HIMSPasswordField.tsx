import React, { useState } from "react";
import type { IconType } from "react-icons";

interface HIMSPasswordFieldProps {
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
  showStrengthIndicator?: boolean;
}

const HIMSPasswordField = React.forwardRef<
  HTMLInputElement,
  HIMSPasswordFieldProps
>(
  (
    {
      Icon,
      displayLabel,
      isRequired = false,
      placeholderText = "Enter your password",
      extraInfo,
      error,
      iconSize = 14,
      classNames,
      isDisabled = false,
      name = "password",
      onChange,
      onBlur,
      value,
      autoComplete = "current-password",
      showStrengthIndicator = false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={`${classNames} flex flex-col gap-2 relative pb-5`}>
        {(displayLabel || Icon) && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-primary" fontSize={iconSize} />}
            <label className="text-sm text-label">
              {displayLabel || "Password"}{" "}
              {isRequired && <span className="text-red-600">*</span>}
            </label>
          </div>
        )}

        {extraInfo && (
          <small className="text-xs text-gray-500">{extraInfo}</small>
        )}

        <div className="relative">
          <input
            ref={ref}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            type={showPassword ? "text" : "password"}
            placeholder={placeholderText}
            className={`w-full rounded-md text-sm p-2 ${
              error ? "border border-red-500" : "border border-gray-200"
            }`}
            disabled={isDisabled}
            value={value}
            autoComplete={autoComplete}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {showStrengthIndicator && value && (
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                value.length < 6
                  ? "bg-red-500"
                  : value.length < 8
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, value.length * 10)}%` }}
            />
          </div>
        )}

        {error && (
          <small className="absolute bottom-1 left-0 text-red-500 text-[11px]">
            {error}
          </small>
        )}
      </div>
    );
  }
);

HIMSPasswordField.displayName = "HIMSPasswordField";

export default HIMSPasswordField;
