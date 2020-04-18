import * as React from "react";
import { Hello } from "./components/hello";

export const App: React.FC = () => (
  <div>
    <Hello compiler={"Typescript"} framework={"react"} />
  </div>
);
