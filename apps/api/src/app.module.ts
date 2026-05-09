import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/user.entity';
import { Sight } from './modules/sights/sight.entity';
import { Review } from './modules/reviews/review.entity';
import { Photo } from './modules/photos/photo.entity';
import { Event } from './modules/events/event.entity';
import { Guide } from './modules/guides/guide.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },

        entities: [User, Sight, Review, Photo, Event, Guide],
        migrations: [__dirname + '/migrations/*.{ts,js}'],
        synchronize: false,
        logging: config.get('NODE_ENV') !== 'production',
      }),
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
