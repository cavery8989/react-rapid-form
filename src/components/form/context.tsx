import * as React from "react";

export interface IForm {
  [key: string]: any;
}

interface IFormState {
  submitting: boolean;
  hasErrors: boolean;
  showingValidationMessages: boolean;
  validationMessages: string[];
}

interface FormContextProps {
  initValues?: IForm;
  formComp: () => any;
}

const FormContext = React.createContext<any>(null);

export const formContextProviderWrapper = (initValues: IForm) => (
  formComp: () => JSX.Element
) => {
  const formValues = React.useState(initValues || {});
  const formState = React.useState<IFormState>({
    hasErrors: false,
    showingValidationMessages: false,
    submitting: false,
    validationMessages: [],
  });
  return (
    <FormContext.Provider value={{ formValues, formState }}>
      {formComp()}
    </FormContext.Provider>
  );
};

export const useFormValues = () => {
  const context = React.useContext(FormContext);
  const {
    formValues: [currentState, setState],
  } = context;

  return {
    updateFormValue: (name: string, nextValue: string) => {
      setState((prevState: IForm) => {
        const newState = { ...prevState };
        newState[name] = nextValue;
        console.log(newState);

        return newState;
      });
    },
    currentValues: currentState,
  };
};

export const useFormState = () => {
  const context = React.useContext(FormContext);
  const {
    formState: [currentFormState, setFormState],
  } = context;

  return {
    setSubmitting: (value: boolean) => {
      setFormState((prevState: any) => {
        const newState = { ...prevState };
        newState.submitting = value;
        return newState;
      });
    },
    ...currentFormState,
  };
};

export const useFormInput = (name: string) => {
  const { currentValues, updateFormValue } = useFormValues();
  const onChange = (nextValue: string) => {
    updateFormValue(name, nextValue);
  };
  return {
    value: currentValues.name,
    onChange,
  };
};
