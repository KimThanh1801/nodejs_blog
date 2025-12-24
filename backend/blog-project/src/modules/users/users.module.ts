import { usersController } from "./users.controller";
import { UsersService } from "./users.service";

export const UsersModule = {
  controller: usersController,
  service: new UsersService(),
};