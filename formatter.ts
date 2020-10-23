import {
  dateToString,
  Level,
  Log,
  numToLevel
} from "./deps.ts";
import { Internals } from "./options.interface.ts";

/** Generic interface for plain objects */
interface KeyValuePair {
  [key: string]: unknown;
}

export class Formatter {

  protected logLevelAsStr: keyof typeof Level;
  protected offsetLabel: number = 10;
  protected output: string = "";

  private offsetProp: number = 20;
  private space_chr: string = " ";

  constructor(log: Log, protected internals: Internals) {
    this.logLevelAsStr = typeof log.level === "number" ? numToLevel(log.level as Level) : log.level as keyof typeof Level;
  }

  protected bindings(bindings?: KeyValuePair): this {
    this.output += this.internals.colors.keys(this.printKeys("bindings", bindings));
    return this;
  }

  protected level(): this {
    this.output += this.internals.colors.bold(this.internals.colors[this.logLevelAsStr](this.logLevelAsStr.toUpperCase()));
    this.output += this.spacer(this.longestLevelLabel - this.logLevelAsStr.length + 1);
    return this;
  }

  protected message(msg?: unknown): this {
    this.output += this.internals.colors[this.logLevelAsStr](String(msg) || "");
    return this;
  }

  protected payload(payload?: KeyValuePair): this {
    this.output += this.internals.colors.keys(this.printKeys("payload", payload));
    return this;
  }

  private printKeys(key: string, object?: KeyValuePair): string {
    let output: string = "";
    if(!object || !Object.keys(object).length) return output;

    let i: number = 0;
    
    for(let prop in object) {
      const ignore = this.internals.ignore.includes(prop);
      if(!i && !ignore) {
        output += this.newLine;
        output += this.spacer(this.offsetLabel);
        const label = `${key.toUpperCase()}:`;
        output += this.internals.colors.bold(label);
        output += this.spacer(this.offsetProp - label.length - this.offsetLabel);
        output += `${prop}: ${String(object[prop])}`;
        i++;
      } else if(!ignore) {
        output += this.newLine;
        output += this.spacer(this.offsetProp);
        output += `${prop}: ${String(object[prop])}`;
        i++;
      }
      
    }
    return output;
  }

  protected spacer(n: number=1): string {
    let res: string = "";
    for(let i=0; i<n; i++) res += this.space_chr;
    return res;
  }

  protected time(time?: string | number): this {
    if(!time || !this.internals.time) return this;
    const date = new Date(typeof time === "number" ? time : parseInt(time));
    this.output += this.internals.colors.time(`[${dateToString(this.internals.timeFormat, date)}]`);
    this.output += this.spacer(1);
    return this;
  }

  private get longestLevelLabel(): number {
    const lengths: number[] = Object
      .keys(Level)
      .map(key => isNaN(parseInt(key)) ? key.length : -1);
    return Math.max(...lengths);
  }

  protected get newLine(): string {
    return "\n";
  }

}