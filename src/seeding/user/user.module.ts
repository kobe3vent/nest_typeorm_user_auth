import { Module } from "@nestjs/common";
import { User } from "modules/user/entities/user.entity";
import { UserSeederService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeederService],
  exports: [UserSeederService],
})
export class UserSeederModule {}
