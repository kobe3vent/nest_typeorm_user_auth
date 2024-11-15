import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { SharedModule } from "../shared/shared.module";
import { AppService } from "./app.service";
import { AuthModule } from "modules/auth/auth.module";
import { SeederModule } from "seeding/seeder.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppConfigService } from "modules/shared/config.service";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: AppConfigService) =>
        configService.postgresConfig,
      inject: [AppConfigService],
    }),
    UserModule,
    AuthModule,
    SeederModule,
  ],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
