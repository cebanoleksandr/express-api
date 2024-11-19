import { LoggerService } from "../logger/logger.service";
import { Router, Response } from "express";
import { ExpressRetyrnType, IControllerRoute } from "./route.interface";
import { ILogger } from "../logger/logger.interface";
import { injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
  private _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): ExpressRetyrnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressRetyrnType {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): ExpressRetyrnType {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const middleware = route.middlewares?.map(m => m.execute.bind(m));
      const handle = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handle] : handle
      this.router[route.method](route.path, pipeline);
    }
  }
}
