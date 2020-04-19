import * as React from "react";
import { useFormInput } from "./context";

interface InputProps {
  name: string;
  label: string;
}

export const FormTextInput: React.FC<InputProps> = ({ name, label }) => {
  const { value, onChange } = useFormInput(name);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={name}>{label || name}</label>
      <input
        id={name}
        onChange={handleChange}
        value={value || ""}
        type="text"
      />
    </div>
  );
};
