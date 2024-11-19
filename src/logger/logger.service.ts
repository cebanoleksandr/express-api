import { Logger } from "tslog";
import { ILogger } from "./logger.interface";
import { injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
  public logger: Logger<void>;

  constructor() {
    this.logger = new Logger({});
  }

  log(...arg: unknown[]): void {
    this.logger.info(...arg);
  }

  error(...arg: unknown[]): void {
    this.logger.error(...arg);
  }

  warn(...arg: unknown[]): void {
    this.logger.warn(...arg);
  }
}
