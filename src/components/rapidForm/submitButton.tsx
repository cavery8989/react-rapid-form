import * as React from "react";
import { useFormState } from "./context";

export const SubmitButton: React.FC = () => {
  const { setSubmitting, submitting } = useFormState();
  const handleClick = React.useCallback(() => {
    if (!submitting) {
      setSubmitting(true);
    }
  }, []);
return <button onClick={handleClick}> {submitting ? 'submiting' : 'submit'}</button>;
};
