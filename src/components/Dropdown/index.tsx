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
}

const Dropdown = ({ value, placeHolder, options, onChange }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setTimeout(() => setOpen(false), 50);
  };

  return (
    <div className="relative inline-block">
      <div
        className="w-[200px] cursor-pointer rounded-md border border-solid px-2 py-1"
        onClick={() => setOpen((prev) => !prev)}
      >
        {options.find((o) => o.value === value)?.label || placeHolder}
      </div>
      {open && (    
        <div className="absolute z-10 mt-[0.5px] flex w-[200px] select-none flex-col gap-2 overflow-hidden rounded-md border border-solid bg-white py-1">
          {options.map((option) => (
            <div
              className={`cursor-pointer px-2 py-1 ${option.value === value && "bg-blue-200"}`}
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
