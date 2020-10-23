# Papyrus-Pretty
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/ymonb1291/papyrus-pretty?include_prereleases)
![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/ymonb1291/papyrus-pretty/latest?sort=semver)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ymonb1291/papyrus-pretty)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/papyrus-pretty/mod.ts)
![GitHub](https://img.shields.io/github/license/ymonb1291/papyrus-pretty)

A formatter for [Papyrus](https://github.com/ymonb1291/papyrus) that makes your logs **pretty**.

# How to use
Basic usage:
```
import { Papyrus } from "https://deno.land/x/papyrus/mod.ts";
import { PapyrusPretty } from "https://deno.land/x/papyrus-pretty/mod.ts";

const logger = new Papyrus({
  formatter: new PapyrusPretty
});

logger.trace("This is a trace");
logger.debug("This is a debug");
logger.info("This is an info");
logger.warn("This is a warning");
logger.error("This is an error");
```

Or with options:
```
import { Papyrus } from "https://deno.land/x/papyrus/mod.ts";
import { PapyrusPretty } from "https://deno.land/x/papyrus-pretty/mod.ts";

const logger = new Papyrus({
  formatter: new PapyrusPretty({
    // options...
  })
});

logger.trace("This is a trace");
logger.debug("This is a debug");
logger.info("This is an info");
logger.warn("This is a warning");
logger.error("This is an error");
```

# Table of contents
- [Table of contents](#table-of-contents)
- [Using bindings](#using-bindings)
- [Using payloads](#using-payloads)
- [Options](#options)
  - [PPrettyOptions](##pprettyoptions)
  - [ColorOptions](##coloroptions)
- [Contributions](#contributions)

# Using bindings
`Papyrus-Pretty` can print your logger's bindings but there is a caveat: `mergeBindings` must be set to `false`. Here is an example:
```
const bindings = {
  arch: Deno.build.arch,
  os: Deno.build.os,
  pid: Deno.pid,
}

const logger = new Papyrus({
  bindings,
  mergeBindings: false,
  formatter: new PapyrusPretty
});

logger.info("This is an info");
```

# Using payloads
`Papyrus-Pretty` can also print your logger's payloads but, you guessed-it, there is once again a caveat: `mergePayload` must be set to `false`. Here is an example:
```
const logger = new Papyrus({
  mergePayload: false,
  formatter: new PapyrusPretty
});

const payload = {
  x: 0.12,
  y: 0.71,
  z: 0.35,
}

logger.info("This is an info", payload);
```

# Options

## PPrettyOptions
`Papyrus-Pretty` can be configured through an object that implements the interface `PPrettyOptions`. All properties are optional.
```
interface PPrettyOptions {
  colors?: boolean | ColorOptions;
  ignore?: string[];
  time?: boolean;
  timeFormat?: string;
}
```

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`colors` | boolean \| ColorOptions | true | Allows you to list custom colors or disable colors entirely
`ignore` | string[] | [ ] | Bindings and payload keys which are listed in this array will be ignored
`time` | boolean | true | Displays the time when true
`timeFormat` | string | "yyyy-MM-dd hh:mm:ss.SSS O" | Time format according to [date_format_deno](https://deno.land/x/date_format_deno#format-keys)

## ColorOptions
A `ColorOptions` configuration object must be provided when creating a child logger.
```
interface ColorOptions {
  debug?: ColorFunction;
  error?: ColorFunction;
  info?: ColorFunction;
  keys?: ColorFunction;
  stack?: ColorFunction;
  time?: ColorFunction;
  trace?: ColorFunction;
  warn?: ColorFunction;
}
```

Property | Type | Default | Description
-------- | ---- | ------- | -----------
`debug` | ColorFunction | `brightBlue` | Defines the color of `debug` level logs
`error` | ColorFunction | `brightRed` | Defines the color of `error` level logs
`info` | ColorFunction | `brightGreen` | Defines the color of `info` level logs
`keys` | ColorFunction | `brightBlack` | Defines the color of the keys for the bindings and payload
`stack` | ColorFunction | `brightBlack` | Defines the color of the keys for the stack
`time` | ColorFunction | `brightBlack` | Defines the color of the keys for the time
`trace` | ColorFunction | `brightBlack` | Defines the color of `trace` level logs
`warn` | ColorFunction | `brightYellow` | Defines the color of `warn` level logs

## ColorFunction
A `ColorFunction` is a function that takes a string and returns a modified string. We name it `ColorFunction` because it corresponds to the signature of the functions from `https://deno.land/std/fmt/colors.ts` which `Papyrus-Pretty` is using behind the scene.
```
type ColorFunction = (str: string) => string;
```

# Contributions
PRs are welcome!