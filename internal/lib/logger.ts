import { blue, bold, gray, green, magenta, red, yellow } from "../deps.ts";

type LogMode = "info" | "warn" | "error" | "fine" | "cmd";

export class Logger {
  timer: boolean | undefined;

  constructor(options?: {
    timer?: boolean;
  }) {
    this.timer = options?.timer;
  }

  static verbose(): Logger {
    return new VerboseLogger();
  }

  print(msg: string, mode: LogMode) {
    switch (mode) {
      case "info":
        this.info(msg);
        break;
      case "warn":
        this.warn(msg);
        break;
      case "error":
        this.error(msg);
        break;
      case "fine":
        this.fine(msg);
        break;
      case "cmd":
        this.cmd(msg);
        break;
    }
  }

  info(msg: string) {
    console.log(blue("[INFO]"), msg);
  }
  warn(msg: string) {
    console.log(yellow("[WARN]"), msg);
  }
  error(msg: string) {
    console.log(red("[SEVERE]"), msg);
  }
  fine(msg: string) {
    console.log(green("[FINE]"), msg);
  }
  cmd(msg: string) {
    console.log(magenta("[CMD]"), msg);
  }

  verbose(msg: string) {
    const _ignore = msg;
    return;
  }
}

export class VerboseLogger extends Logger {
  constructor() {
    super({ timer: true });
  }

  override verbose(msg: string): void {
    console.log(gray(bold("[VERBOSE]")), gray(msg));
  }
}
