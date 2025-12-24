import { CreateUserDto } from "./dto/users.dto.js";

interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
}

export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(userDto: CreateUserDto) {
    const newUser: User = { id: this.idCounter++, ...userDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findByEmail(email: string) {
    return this.users.find(u => u.email === email);
  }
}
