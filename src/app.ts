import express, { Express } from "express";
import { Server } from "http";
import { ILogger } from "./logger/logger.interface";
import { inject, injectable } from "inversify";
import { json } from "body-parser";
import { TYPES } from "./types";
import 'reflect-metadata';
import { IConfigService } from "./config/config.service.interface";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { UserController } from "./users/users.controller";
import { PrismaService } from "./database/prisma.service";
import { AuthMiddleware } from "./common/auth.middleware";

@injectable()
export class App {
  app: Express;
  server!: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {
    this.app = express();
    this.port = 3008;
  }

  useMiddleware(): void {
    this.app.use(json());
    const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is running on http://localhost:${this.port}`);
  }
}
