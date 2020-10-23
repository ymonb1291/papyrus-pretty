import {
  bold, 
  brightBlack,
  brightBlue,
  brightGreen,
  brightYellow,
  brightRed
} from "./deps.ts";
import { ErrorHandler } from "./error_handler.ts";
import { Message } from "./message_handler.ts";

import type {
  Formatter,
  Log,
  LogWithError,
  LogWithMessage
} from "./deps.ts";
import type {
  ColorFunction,
  Internals,
  PPrettyOptions
} from "./options.interface.ts";

const idFn: ColorFunction = (str: string): string => str;

export class PapyrusPretty implements Formatter {

  private internals: Internals;

  constructor(options?: PPrettyOptions) {
    this.internals = {
      colors: {
        bold: options?.colors || options?.colors === undefined ? bold : idFn,
        debug: typeof options?.colors === "object"
          ? options.colors.debug
            ? options.colors.debug
            : brightBlue
          : options?.colors === undefined
            ? brightBlue
            : options.colors
              ? brightBlue
              : idFn,
        error: typeof options?.colors === "object"
          ? options.colors.error
            ? options.colors.error
            : brightRed
          : options?.colors === undefined
            ? brightRed
            : options.colors
              ? brightRed
              : idFn,
        info: typeof options?.colors === "object"
          ? options.colors.info
            ? options.colors.info
            : brightGreen
          : options?.colors === undefined
            ? brightGreen
            : options.colors
              ? brightGreen
              : idFn,
        keys: typeof options?.colors === "object"
          ? options.colors.keys
            ? options.colors.keys
            : brightBlack
          : options?.colors === undefined
            ? brightBlack
            : options.colors
              ? brightBlack
              : idFn,
        stack: typeof options?.colors === "object"
          ? options.colors.stack
            ? options.colors.stack
            : brightBlack
          : options?.colors === undefined
            ? brightBlack
            : options.colors
              ? brightBlack
              : idFn,
        time: typeof options?.colors === "object"
          ? options.colors.time
            ? options.colors.time
            : brightBlack
          : options?.colors === undefined
            ? brightBlack
            : options.colors
              ? brightBlack
              : idFn,
        trace: typeof options?.colors === "object"
          ? options.colors.trace
            ? options.colors.trace
            : brightBlack
          : options?.colors === undefined
            ? brightBlack
            : options.colors
              ? brightBlack
              : idFn,
        warn: typeof options?.colors === "object"
          ? options.colors.warn
            ? options.colors.warn
            : brightYellow
          : options?.colors === undefined
            ? brightYellow
            : options.colors
              ? brightYellow
              : idFn,
      },
      ignore: options?.ignore || [],
      time: options?.time || options?.time === undefined ? true : false,
      timeFormat: options?.timeFormat || "yyyy-MM-dd hh:mm:ss.SSS O"
    }
  }

  public format(log: Log | string, _v: number): Log | string {
    if(_v !== 1) return log;
    try {
      const str = typeof log === "string" ? JSON.parse(log) : this.handler(log);
      return str;
    } catch {
      return log;
    }
  }

  private handler(log: Log): string {
    return log.hasOwnProperty("error")
      ? new ErrorHandler(log, this.internals).prettify(log as LogWithError)
      : new Message(log, this.internals).prettify(log as LogWithMessage);
  };

}