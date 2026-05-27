import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/users/user.entity';
import { Sight } from './models/sights/sight.entity';
import { Review } from './models/reviews/review.entity';
import { Photo } from './models/photos/photo.entity';
import { Event } from './models/events/event.entity';
import { Guide } from './models/guides/guide.entity';
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
