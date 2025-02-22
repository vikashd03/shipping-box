import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  placeHolder: string;
  options: Option[];
  onChange: (value: string) => void;
  width?: number;
  height?: number;
}

const Dropdown = ({
  value,
  placeHolder,
  options,
  onChange,
  width = 200,
  height = 40,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setTimeout(() => setOpen(false), 50);
  };

  return (
    <div className="relative inline-block w-fit">
      <div
        className={`w-[${width - 40}px] sm:w-[${width}px] h-[${height - 10}px] sm:h-[${height}px] flex cursor-pointer items-center rounded-md border border-solid px-3 py-[3px] sm:py-[6px]`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {options.find((o) => o.value === value)?.label || placeHolder}
      </div>
      {open && (
        <div
          className={`absolute z-10 mt-[0.5px] flex w-[${width - 40}px] sm:w-[${width}px] select-none flex-col gap-1 overflow-hidden rounded-md border border-solid bg-white py-1 sm:gap-2`}
        >
          {options.map((option) => (
            <div
              className={`cursor-pointer px-3 py-1 ${option.value === value && "bg-blue-200"}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
