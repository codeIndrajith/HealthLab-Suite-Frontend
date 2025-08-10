import React from "react";
import type { IconType } from "react-icons";

interface HIMSRadioGroupProps<T, U> {
  Icon?: IconType;
  displayLabel?: string;
  options: T[];
  optionKey: U;
  displayKey: U;
  iconKey?: U;
  name: string;
  isRequired?: boolean;
  extraInfo?: string;
  error?: string;
  iconSize?: number;
  classNames?: string;
  onChange: (selectedOption: T) => void;
  value?: T;
  isDisabled?: boolean;
}

const HIMSRadioGroup = <T extends object, U extends keyof T>({
  Icon,
  displayLabel,
  options,
  optionKey,
  displayKey,
  iconKey,
  name,
  isRequired = false,
  extraInfo,
  error,
  iconSize = 14,
  classNames,
  onChange,
  value,
  isDisabled = false,
}: HIMSRadioGroupProps<T, U>) => {
  const handleSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedOption = options.find(
      (i) => String(i[optionKey]) === e.target.value.toString()
    );
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <div className={`${classNames} flex flex-col gap-2`}>
      <div className="relative pb-4 flex flex-col gap-2">
        {/* ICON & LABEL */}
        {(Icon || displayLabel) && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-primary" fontSize={iconSize} />}
            {displayLabel && (
              <label className="text-sm text-label">
                {displayLabel}{" "}
                {isRequired && <span className="text-red-600">*</span>}
              </label>
            )}
          </div>
        )}
        {/* EXTRA INFO */}
        {extraInfo && <small>{extraInfo}</small>}

        {/* ERROR MESSAGE */}
        {error && (
          <small className="absolute bottom-1 left-0 text-red-500 text-[11px]">
            {error}
          </small>
        )}
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {/* OPTIONS CONTAINER */}
        {options.length > 0 &&
          options.map((option) => (
            <HIMSRadioGroupOption
              key={String(option[optionKey])}
              OptionIcon={iconKey ? (option[iconKey] as IconType) : undefined}
              value={String(option[optionKey])}
              text={String(option[displayKey])}
              name={name}
              onChange={handleSelect}
              isChecked={Boolean(
                value && String(value[optionKey]) === String(option[optionKey])
              )}
              isDisabled={isDisabled}
            />
          ))}
      </div>
    </div>
  );
};

interface HIMSRadioGroupOptionProps {
  OptionIcon?: IconType;
  //id: number | string;
  value: number | string;
  text: number | string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  isDisabled?: boolean;
}

const HIMSRadioGroupOption: React.FC<HIMSRadioGroupOptionProps> = ({
  OptionIcon,
  value,
  text,
  name,
  onChange,
  isChecked,
  isDisabled = false,
}) => {
  return (
    <div className="flex items-center gap-2 border-none border-primary px-3 py-2 rounded-sm bg-white shadow-lg">
      {OptionIcon && <OptionIcon />}
      <input
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={isChecked}
        disabled={isDisabled}
      />
      <label className="text-black text-xs">{text}</label>
    </div>
  );
};

export default HIMSRadioGroup;
