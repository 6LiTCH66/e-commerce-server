import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import * as passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";
import { useContainer } from "class-validator";

import * as connectRedis from 'connect-redis';
import Redis from 'ioredis';


const prisma = new PrismaClient()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), {fallbackOnErrors: true})


  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))

  const RedisStore = connectRedis(session);

  const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
  });


  redisClient.on('connect', () =>
    console.log('Connected to redis successfully')
  );


  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
      },
      store: new RedisStore({client: redisClient}),
    }),
  );

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(3000);
}
bootstrap();
