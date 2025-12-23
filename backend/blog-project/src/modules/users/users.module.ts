import * as userController from './users.controller';
import * as userService from './users.service';
import { CreateUserDto } from './dto/users.dto';

// Gom tất cả vào một object để export
const UserModule = {
  controller: userController,
  service: userService,
};

export { CreateUserDto };
export default UserModule;