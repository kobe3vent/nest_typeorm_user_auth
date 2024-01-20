import { Injectable } from "@nestjs/common";
import { UserSeederService } from "./user/user.service";
import { User } from "modules/user/entities/user.entity";

@Injectable()
export default class SeederService {
  constructor(private readonly _userSeederService: UserSeederService) {}
  async seed_all(): Promise<void> {
    await this.seed_alpha_user();
  }

  async seed_alpha_user(): Promise<User> {
    const existing_user = await this._userSeederService.findUserAlpha();
    if (!existing_user) {
      const user = await this._userSeederService.createUser();
      console.log("alpha users seeded");
      return user;
    }
    return existing_user;
  }
}
