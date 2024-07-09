import { italic, red } from "jsr:@std/fmt/colors";
import { Logger, VerboseLogger } from "./logger.ts";

export class Runner {
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async run(cmd: string, args: string[]) {
    const commandStr = [cmd, ...args].join(" ");

    this.logger.verbose(`Running ${commandStr}`);

    const command = new Deno.Command(cmd, { args });
    const { code, stdout, stderr } = await command.output();
    const textDecoder = new TextDecoder();

    textDecoder.decode(stdout).split("\n").forEach(this.logger.cmd);

    if (code != 0) {
      this.logger.error(
        `Error running command: ${commandStr} exited with exit code ${code}`,
      );
      if (this.logger instanceof VerboseLogger) {
        this.logger.verbose(`Stderr: ${italic(textDecoder.decode(stderr))}`);
      } else this.logger.error("Use '--verbose' to see the output");
    } else {
      this.logger.verbose(`Command ${commandStr} run successfully`);
    }

    return code === 0;
  }
}
