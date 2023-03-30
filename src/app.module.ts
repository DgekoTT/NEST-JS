import {Module} from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/user.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-role.model";
import { AuthModule } from './auth/auth.module';
import {Profile} from "./profile/profile.model";
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {BlocksModule} from "./blocks/blocks.module";
import {TokenModule} from "./token/token.module";
import {Block} from "./blocks/blocks.model";
import {Token} from "./token/token.model";


@Module({
  controllers: [],
  providers: [],
  imports: [
      // что бы нест всю конфигурацию считывал
    ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`   /*получаем конфигурации
         для разработки и для продакшена, нужно npm i cross-env*/
      }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Profile, Post, Block, Token],
      autoLoadModels: true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
    BlocksModule,
    TokenModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname,'static'),
    }),
  ],
})

export class AppModule {}