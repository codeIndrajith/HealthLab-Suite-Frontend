import React, { useRef } from "react";
import type { IconType } from "react-icons";

interface HIMSCheckboxGroupProps<T, U> {
  Icon?: IconType;
  displayLabel?: string;
  options: T[];
  optionKey: U;
  displayKey: U;
  iconKey?: U;
  extraInfo?: string;
  error?: string | number;
  iconSize?: number;
  classNames?: string;
  onChange?: (options: T[]) => void;
  values?: T[];
}

const HIMSCheckboxGroup = <T extends object, U extends keyof T>({
  Icon,
  displayLabel,
  options,
  optionKey,
  displayKey,
  iconKey,
  extraInfo,
  error,
  iconSize = 14,
  classNames,
  onChange,
  values,
}: HIMSCheckboxGroupProps<T, U>) => {
  // const handleSelect: React.ChangeEventHandler<HTMLInputElement> = (e) => {

  //     if(e.target.checked) {
  //         // add into the array
  //         const checkedOption = options.find(i => String(i[optionKey]) === e.target.value);
  //         if(checkedOption && onChange && values) {
  //             // update react-hook-form state
  //             onChange([...values, checkedOption]);
  //         }
  //     }

  //     if(!e.target.checked) {
  //         // remove from the array
  //         if(onChange && values) {
  //             const updatedOptions = values.filter(i => String(i[optionKey]) !== e.target.value);
  //             onChange(updatedOptions);
  //         }
  //     }
  // }
  const handleSelect = (isChecked: boolean, value: string) => {
    if (isChecked) {
      // add into the array
      const checkedOption = options.find((i) => String(i[optionKey]) === value);
      if (checkedOption && onChange && values) {
        // update react-hook-form state
        onChange([...values, checkedOption]);
      }
    }

    if (!isChecked) {
      // remove from the array
      if (onChange && values) {
        const updatedOptions = values.filter(
          (i) => String(i[optionKey]) !== value
        );
        onChange(updatedOptions);
      }
    }
  };

  return (
    <div className={`${classNames} flex flex-col gap-2`}>
      <div className="relative pb-2 flex flex-col gap-2">
        {(Icon || displayLabel) && (
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-primary" fontSize={iconSize} />}
            {displayLabel && (
              <label className="text-sm text-label">{displayLabel}</label>
            )}
          </div>
        )}

        {extraInfo && <small>{extraInfo}</small>}

        {error && (
          <small className="absolute -bottom-1 left-0 custom-error-text-color custom-error-text-size">
            {error}
          </small>
        )}
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        {options.length > 0 &&
          options.map((option) => (
            <HIMSCheckboxGroupOption
              key={String(option[optionKey])}
              OptionIcon={iconKey ? (option[iconKey] as IconType) : undefined}
              value={String(option[optionKey])}
              text={String(option[displayKey])}
              onChange={handleSelect}
              isSelected={
                values?.find((i) => i[optionKey] === option[optionKey])
                  ? true
                  : false
              }
            />
          ))}
      </div>
    </div>
  );
};

interface HIMSCheckboxGroupOptionProps {
  OptionIcon?: IconType;
  value: number | string;
  text: number | string;
  // onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChange: (isChecked: boolean, value: string) => void;
  isSelected: boolean;
}

const HIMSCheckboxGroupOption: React.FC<HIMSCheckboxGroupOptionProps> = ({
  OptionIcon,
  value,
  text,
  onChange,
  isSelected,
}) => {
  const checkboxInputRef = useRef<HTMLInputElement | null>(null);

  const handleCheckboxSelection = () => {
    if (checkboxInputRef.current !== null) {
      checkboxInputRef.current.checked = !checkboxInputRef.current.checked;
      onChange(
        checkboxInputRef.current.checked,
        checkboxInputRef.current.value
      );
    }
  };

  return (
    <button
      type="button"
      className="flex items-center gap-2 border-none border-primary px-3 py-2 rounded-sm  my-custom-box-shadow z-[5]"
      onClick={handleCheckboxSelection}
    >
      {OptionIcon && <OptionIcon />}
      <input
        type="checkbox"
        ref={checkboxInputRef}
        value={value}
        checked={isSelected}
        className="pointer-events-none"
        readOnly
      />
      <label className="text-black text-xs">{text}</label>
    </button>
  );
};

export default HIMSCheckboxGroup;
