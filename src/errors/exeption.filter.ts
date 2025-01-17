import { NextFunction, Request, Response } from "express";
import { HTTPError } from "./http-error.class";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import 'reflect-metadata';

@injectable()
export class ExeptionFilter implements ExeptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) { }

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Error ${err.statusCode} ${err.message}`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(err.message);
      res.status(500).send({ err: err.message });
    }
  }
}
