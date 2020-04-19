import * as React from "react";
import { useFormInput } from "./context";
import { BaseInputProps } from "./declararations";

interface InputProps extends BaseInputProps {}

export const TextInput: React.FC<InputProps> = ({ name, label }) => {
  const { value, onChange } = useFormInput(name);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        onChange={handleChange}
        value={value || ""}
        type="text"
      />
    </div>
  );
};
