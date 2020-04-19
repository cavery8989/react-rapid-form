import * as React from "react";
import {
  formContextProviderWrapper,
  IForm,
  useFormValues,
  useFormState,
} from "./context";

interface FromContainerProps {
  onchange?: (latestValues: IForm) => void;
  onSubmit?: (formValue: IForm) => void;
}
interface FormProps extends FromContainerProps {
  initValues?: IForm;
}

export const Form: React.FC<FormProps> = ({
  children,
  initValues,
  onSubmit,
}) => {
  return formContextProviderWrapper(initValues)(() => (
    <FormContainer onSubmit={onSubmit}>{children}</FormContainer>
  ));
};

const FormContainer: React.FC<FromContainerProps> = ({
  onSubmit,
  onchange,
  children,
}) => {
  const { submitting, setSubmitting } = useFormState();
  const { currentValues } = useFormValues();

  React.useEffect(() => {
    manageSubmit();
    async function manageSubmit() {
      const p = new Promise(async () => {
        if (submitting && onSubmit) {
          await onSubmit(currentValues);
          setSubmitting(false);  
        }
      });
      await p;
    }
  }, [submitting]);

  return <>{children}</>;
};
