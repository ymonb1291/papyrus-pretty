import type { Log, LogWithError, LogWithMessage } from "./deps.ts";
export interface Handler {
  prettify(log: LogWithMessage | LogWithError): string;
}