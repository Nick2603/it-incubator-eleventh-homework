import { UsersController } from "./controllers/usersController";
import { UsersService } from "./domains/usersService";
import { UsersQueryRepository } from "./repositories/usersQueryRepository";
import { UsersRepository } from "./repositories/usersRepository";

export const usersRepository = new UsersRepository();

const usersQueryRepository = new UsersQueryRepository();

export const usersService = new UsersService(usersRepository);

export const usersController = new UsersController(usersService, usersQueryRepository);
