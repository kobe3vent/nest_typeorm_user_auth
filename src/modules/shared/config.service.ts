import { isNil } from "lodash";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import * as dotenv from "dotenv";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
dotenv.config();

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + " environment variable is not set");
    }

    return value;
  }
  private getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(key + " environment variable is not a number");
    }
  }

  private getString(key: string): string {
    const value = this.get(key);

    return value.replace(/\\n/g, "\n");
  }
  public getPort() {
    return this.getNumber("PORT");
  }

  public isProduction() {
    const mode = this.getString("MODE");
    return mode != "dev";
  }

  get jwtConfig(): {
    jwtSecret: string;
    jwtExpirationTime: string;
  } {
    return {
      jwtSecret: this.getString("JWT_SECRET_KEY"),
      jwtExpirationTime: this.getString("JWT_EXPIRATION_TIME"),
    };
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + "/../../modules/**/*.entity{.ts,.js}"];

    return {
      entities,
      // migrations,
      type: "postgres",
      // name: 'default',
      host: this.getString("POSTGRES_HOST"),
      port: this.getNumber("POSTGRES_PORT"),
      username: this.getString("POSTGRES_USER"),
      password: this.getString("POSTGRES_PASSWORD"),
      database: this.getString("POSTGRES_DATABASE"),
      // migrationsRun: true,
      synchronize: true,
      //logging: this.getBoolean('ENABLE_ORM_LOGS'),
      autoLoadEntities: true,
      retryAttempts: 3,
    };
  }
}
