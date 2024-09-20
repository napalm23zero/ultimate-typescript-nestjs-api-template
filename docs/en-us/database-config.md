# Configuration Files and Setup

So, you've decided to deal with application configurations? Bold move. Let’s make sure you don’t mess things up.

## Configuration Files Overview

In this app, we have several configuration files to manage our database connections and other settings. These configuration files are stored in the `src/config/database/` directory, and they handle the integration with MySQL, MongoDB, and Redis. Here's what each file does and how it's used.

---

## MongoDB Configuration 🍃

### File: `mongo.database.config.ts`

This file contains the configuration for connecting to MongoDB. It uses the `ConfigService` to retrieve the MongoDB connection details from the environment variables.

```ts
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const mongoConfig = (configService: ConfigService): MongooseModuleOptions => ({
  uri: `mongodb://${configService.get<string>('MONGO_INITDB_ROOT_USERNAME')}:${configService.get<string>('MONGO_INITDB_ROOT_PASSWORD')}@${configService.get<string>('MONGO_HOST')}:${configService.get<number>('MONGO_PORT')}/${configService.get<string>('MONGO_DB')}`,
})
```

### How it's used

In `main.ts`, the `connectMongoDatabase` function is called to establish the connection with MongoDB.

```ts
import { connectMongoDatabase } from './config/database/mongo.database.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  connectMongoDatabase(app)
  // ...
}
```

---

## MySQL Configuration 🐬

### File: `mysql.database.config.ts`

This file sets up the MySQL connection using the `ConfigService` to pull credentials from the environment.

```ts
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'

export const mysqlConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST', 'localhost'),
  port: configService.get<number>('MYSQL_PORT', 3306),
  username: configService.get<string>('MYSQL_USER', 'root'),
  password: configService.get<string>('MYSQL_PASSWORD', 'password'),
  database: configService.get<string>('MYSQL_DATABASE', 'database_name'),
  synchronize: configService.get<boolean>('MYSQL_SYNCHRONIZE', true),
  entities: [join(__dirname, '/../**/entity/*.ts'), join(__dirname, '/../**/entity/*.js')],
})
```

### How it's used

The `connectMySqlDatabase` function is called in `main.ts` to initiate the MySQL connection.

```ts
import { connectMySqlDatabase } from './config/database/mysql.database.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await connectMySqlDatabase(app)
  // ...
}
```

---

## Redis Configuration 🚀

### File: `redis.database.config.ts`

The Redis configuration is handled here. It fetches connection details using `ConfigService` and sets up the Redis client.

```ts
import { ConfigService } from '@nestjs/config'
import Redis, { RedisOptions } from 'ioredis'

export const redisConfig = (configService: ConfigService): RedisOptions => ({
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  port: configService.get<number>('REDIS_PORT', 6379),
  password: configService.get<string>('REDIS_PASSWORD', ''),
  db: configService.get<number>('REDIS_DATABASE', 0),
})
```

### How it's used

The `connectRedisDatabase` function is used in `main.ts` to configure and connect Redis.

```ts
import { connectRedisDatabase } from './config/database/redis.database.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  connectRedisDatabase(app.get(ConfigService))
  // ...
}
```

---

## Wrapping Up

The configuration files manage the connection details for MongoDB, MySQL, and Redis. They all rely on environment variables provided in the `.env` file and are called in `main.ts` to set up the connections. Make sure you update your `.env` file with the correct credentials and run `docker-compose up` to start everything.

Look how cute the application runnnig wth database connected!

![Database Connected](../img/003.png 'Database Connected')

---

[back](table-of-contents.md)
