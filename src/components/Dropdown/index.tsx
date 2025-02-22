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
  wclassName?: string;
  hclassName?: string;
}

const Dropdown = ({
  value,
  placeHolder,
  options,
  onChange,
  wclassName,
  hclassName,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setTimeout(() => setOpen(false), 50);
  };

  return (
    <div className="relative inline-block w-fit">
      <div
        className={`${wclassName} ${hclassName} flex cursor-pointer items-center rounded-md border border-solid px-3 py-[3px] sm:py-[6px]`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {options.find((o) => o.value === value)?.label || placeHolder}
      </div>
      {open && (
        <div
          className={`absolute z-10 mt-[0.5px] flex ${wclassName} select-none flex-col gap-1 overflow-hidden rounded-md border border-solid bg-white py-1 sm:gap-2`}
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
