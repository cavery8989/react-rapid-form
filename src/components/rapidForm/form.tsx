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
    async function manageSubmit() {
      const p = new Promise(async () => {
        if (onSubmit) {
          await onSubmit(currentValues);
          setSubmitting(false);
        }
      });
      await p;
    }

    if (submitting) {
      manageSubmit();
    }
  }, [submitting]);

  return <>{children}</>;
};
