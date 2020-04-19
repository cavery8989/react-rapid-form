import * as React from "react";
import { Hello } from "./components/hello";
import { Form } from "./components/form/form";
import { FormInput } from "./components/form/input";
import { SubmitButton } from "./components/form/submitButton";

export const App: React.FC = () => {
  
  const handleSubmit = React.useCallback(async (latestForm) => {
    const p = new Promise((resolve: any) => {
      setTimeout(() => {
        console.log(`Form was submitted with ${JSON.stringify(latestForm)}`);
        resolve();
      }, 5000);
    });
    await p;
  }, []);

  const handleTwo = (latestForm: any) => {
    console.log(`Form was submitted with ${JSON.stringify(latestForm)}`);
  }

  return (
    <div>
      <Hello compiler={"Typescript"} framework={"react"} />

      <Form onSubmit={handleSubmit}>
        <FormInput name={"name"} />
        <SubmitButton />
      </Form>

      <Form onSubmit={handleTwo}>
        <FormInput name={"name"} />
        <SubmitButton />
      </Form>
    </div>
  );
};
