import { Injectable } from "@nestjs/common";
import { User } from "modules/user/entities/user.entity";
import { getData } from "./user.data";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository
  ) {}

  async createUser(): Promise<User> {
    const userEntity = this._userRepository.create(getData());

    return this._userRepository.save(userEntity);
  }
  async findUserAlpha(): Promise<User | null> {
    return this._userRepository.findOne({
      where: { email: process.env.USER_ALPHA },
    });
  }
}
