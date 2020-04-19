import * as React from "react";
import { Hello } from "./components/hello";
import {
  Form,
  TextInput,
  SelectInput,
  SubmitButton,
} from "./components/rapidForm";

export const App: React.FC = () => {
  const handleSubmit = React.useCallback(async (latestForm) => {
    const p = new Promise((resolve: any) => {
      setTimeout(() => {
        console.log(`Form was submitted with ${JSON.stringify(latestForm)}`);
        resolve();
      }, 1000);
    });
    await p;
  }, []);

  const handleTwo = (latestForm: any) => {
    console.log(`Form was submitted with ${JSON.stringify(latestForm)}`);
  };

  return (
    <div>
      <Hello compiler={"Typescript"} framework={"react"} />

      <Form onSubmit={handleSubmit}>
        <TextInput label={"First name"} name={"firstName"} />
        <SelectInput
          name={"numberOfCats"}
          options={[
            { label: "one cat", value: 1, },
            { label: "two cats", value: 2, default: true },
            { label: "three cats", value: 3 },
            { label: "three cats", value: 'potato' },
          ]}
        />
        <SubmitButton />
      </Form>
    </div>
  );
};
