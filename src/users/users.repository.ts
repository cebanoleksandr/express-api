import { UserModel } from "@prisma/client";
import { User } from "./user.entity";
import { IUsersRepository } from "./users.repository.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { PrismaService } from "../database/prisma.service";

@injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@inject(TYPES.PrismaService) private prismaServise: PrismaService) { }

  async create(user: User): Promise<UserModel> {
    return this.prismaServise.client.userModel.create({ data: user });
  };

  async find(email: string): Promise<UserModel | null> {
    return this.prismaServise.client.userModel.findFirst({
      where: { email }
    })
  };
}
