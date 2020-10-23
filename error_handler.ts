import { Formatter } from "./formatter.ts";
import { Internals } from "./options.interface.ts";

import type { Log, LogWithError } from "./deps.ts";
import type { Handler } from "./handler.interface.ts";

export class ErrorHandler extends Formatter implements Handler {

  constructor(log: Log, internals: Internals) {
    super(log, internals);
  }

  public prettify(log: LogWithError): string {
    return this
      .time(log.time)
      .level()
      .errorName(log.error.name)
      .message(log.error.message)
      .bindings(log.bindings)
      .payload(log.payload)
      .errorStack(log.error.stack)
      .output;
  }

  private errorName(name: string): this {
    this.output += this.internals.colors[this.logLevelAsStr](`<${name.toUpperCase()}>`);
    this.output += this.spacer(1);
    return this;
  }

  private errorStack(stack: string = ""): this {
    const lines: string[] = stack
      .split("\n")
      .map((line, idx) => idx ? this.spacer(this.offsetLabel-4) + line : "")
      .filter(el => el);
    this.output += this.newLine
    this.output += this.internals.colors.stack(lines.join(this.newLine));
    return this;
  }

}