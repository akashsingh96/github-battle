import * as React from "react";
import { IState } from "../index";

const { Provider, Consumer } = React.createContext<Partial<IState>>({});

export const ThemeProvider = Provider;
export const ThemeConsumer = Consumer;
