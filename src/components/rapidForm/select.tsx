import * as React from "react";
import { ChangeEvent } from "react";
import { useFormInput } from "./context";
import { BaseInputProps, PrimativeType } from "./declararations";

interface FormSelectProps extends BaseInputProps {
  options: { label?: string; value: any; default?: boolean }[];
}

export const SelectInput: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
}) => {
  const REPRESENTS_NULL = "___NULL___";
  const REPRESENTS_UNDEFINED = "___UNDEFINED___";

  const { value, onChange } = useFormInput(name);

  const typeMap = React.useRef(
    options.reduce((mem, op) => {
      const type = typeof op.value;
      if (type === "string" || type === "number") {
        mem[String(op.value)] = type;
      }
      return mem;
    }, {} as { [key: string]: any })
  );

  const handleNullOrUndefinedInput = (value: any) => {
    return value === undefined
      ? REPRESENTS_UNDEFINED
      : value === null
      ? REPRESENTS_NULL
      : value;
  };

  const handleNullOrUndefinedOutput = (value: any) => {
    return value === REPRESENTS_NULL
      ? null
      : value === REPRESENTS_UNDEFINED
      ? undefined
      : value;
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextValue = e.target.value;
    const castValue = recastValue(nextValue, typeMap.current[nextValue]);

    onChange(handleNullOrUndefinedOutput(castValue));
  };

  React.useEffect(() => {
    if (value === undefined) {
      const defaultOption = options.find((o) => o.default);
      if (defaultOption) {
        onChange(defaultOption.value);
      }
    }
  }, [options]);

  return (
    <div className={"form-input"}>
      {label && <label>{label}</label>}
      <select onChange={handleChange} value={handleNullOrUndefinedInput(value)}>
        {options.map((o, i) => (
          <option key={i} value={handleNullOrUndefinedInput(o.value)}>
            {o.label || o.value}
          </option>
        ))}
      </select>
    </div>
  );
};

const recastValue = (value: any, type: PrimativeType) => {
  switch (type) {
    case "string":
      return String(value);
    case "number":
      return Number(value);
    default:
      return value;
  }
};
