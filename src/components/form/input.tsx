import * as React from "react";
import { useFormValues } from "./context";

type InputType = "text" | "number";
interface InputProps {
  value: any;
  onchange: (nextValue: any) => void;
  type: InputType;
}

interface InputWrapperProps {
  name: string;
  type?: InputType;
}

const FormInputContainer = (
  FormPresenter: React.FC<InputProps>
): React.FC<InputWrapperProps> => ({ name, type = "text" }) => {
  const { currentValues, onChange } = useFormValues();

  const handleChange = (nextValue: string) => {
    onChange(name, nextValue);
  };

  return (
    <FormPresenter
      value={currentValues.name || ""}
      onchange={handleChange}
      type={type}
    />
  );
};

const FormPresenter: React.FC<InputProps> = ({ value, onchange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onchange(e.target.value);
  };
  return (
    <div>
      <input onChange={handleChange} value={value} type="text" />
    </div>
  );
};

export const FormInput = FormInputContainer(FormPresenter);
