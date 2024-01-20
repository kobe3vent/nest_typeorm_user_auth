import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { SharedModule } from "../shared/shared.module";
import { AppService } from "./app.service";
import { AuthModule } from "modules/auth/auth.module";
import { SeederModule } from "seeding/seeder.module";

@Module({
  imports: [SharedModule, UserModule, AuthModule, SeederModule],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
