import { Level } from "./deps.ts";

export type ColorFunction = (str: string) => string;

type LevelColorOptions = Record<keyof typeof Level, ColorFunction>;

interface ColorOptions extends Partial<LevelColorOptions> {
  keys?: ColorFunction;
  time?: ColorFunction;
  stack?: ColorFunction;
}

export interface Internals {
  colors: Record<keyof ColorOptions | "bold", ColorFunction>;
  ignore: string[];
  time: boolean;
  timeFormat: string;
}

export interface PPrettyOptions {
  colors?: boolean | ColorOptions;
  ignore?: string[];
  time?: boolean;
  timeFormat?: string;
}