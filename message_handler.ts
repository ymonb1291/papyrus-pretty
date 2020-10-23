import type { Handler } from "./handler.interface.ts";
import type { Log, LogWithMessage } from "./deps.ts";
import { Formatter } from "./formatter.ts";
import { Internals } from "./options.interface.ts";

export class Message extends Formatter implements Handler {

  constructor(log: Log, internals: Internals) {
    super(log, internals);
  }

  public prettify(log: LogWithMessage): string {
    return this
      .time(log.time)
      .level()
      .message(log.message)
      .bindings(log.bindings)
      .payload(log.payload)
      .output;
  }

}