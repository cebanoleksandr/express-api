import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./middleware.interface";
import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction) {
    const instanse = plainToClass(this.classToValidate, body);
    validate(instanse).then(errors => {
      if (!!errors.length) {
        res.status(422).send(errors);
      } else {
        next();
      }
    })
  };
}
