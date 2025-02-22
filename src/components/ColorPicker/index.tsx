import React, { useState } from "react";

const hexToRgb = (hex: string): string => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return `(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb: string): string => {
  const match = rgb.match(/\d+/g);
  if (!match || match.length !== 3) return "#000000";

  const [r, g, b] = match.map(Number);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [color, setColor] = useState<string>(rgbToHex(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(hexToRgb(newColor));
  };

  return (
    <div className="inline-flex items-center gap-4">
      <input
        type="color"
        value={color}
        onChange={handleChange}
        className="h-10 w-20 cursor-pointer border-none focus:outline-none"
      />
      {/* <span>{hexToRgb(color)}</span> */}
    </div>
  );
};

export default ColorPicker;
