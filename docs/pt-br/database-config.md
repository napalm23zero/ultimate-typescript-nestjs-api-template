# Arquivos de Configuração e Setup

Então, você decidiu lidar com as configurações do aplicativo? Movimento ousado. Vamos garantir que você não estrague tudo.

## Visão Geral dos Arquivos de Configuração

Neste app, temos vários arquivos de configuração para gerenciar nossas conexões com bancos de dados e outros serviços. Esses arquivos de configuração estão armazenados no diretório `src/config/database/`, e eles lidam com a integração com MySQL, MongoDB e Redis. Aqui está o que cada arquivo faz e como é usado.

---

## Configuração do MongoDB 🍃

### Arquivo: `mongo.database.config.ts`

Este arquivo contém a configuração para conectar-se ao MongoDB. Ele usa o `ConfigService` para obter os detalhes da conexão a partir das variáveis de ambiente.

```ts
import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

export const mongoConfig = (configService: ConfigService): MongooseModuleOptions => ({
  uri: `mongodb://${configService.get<string>('MONGO_INITDB_ROOT_USERNAME')}:${configService.get<string>('MONGO_INITDB_ROOT_PASSWORD')}@${configService.get<string>('MONGO_HOST')}:${configService.get<number>('MONGO_PORT')}/${configService.get<string>('MONGO_DB')}`,
})
```

### Como é usado

No arquivo `main.ts`, a função `connectMongoDatabase` é chamada para estabelecer a conexão com o MongoDB.

```ts
import { connectMongoDatabase } from './config/database/mongo.database.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  connectMongoDatabase(app)
  // ...
}
```

---

## Configuração do MySQL 🐬

### Arquivo: `mysql.database.config.ts`

Este arquivo configura a conexão MySQL usando o `ConfigService` para buscar as credenciais nas variáveis de ambiente.

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

### Como é usado

A função `connectMySqlDatabase` é chamada no `main.ts` para iniciar a conexão com o MySQL.

```ts
import { connectMySqlDatabase } from './config/database/mysql.database.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await connectMySqlDatabase(app)
  // ...
}
```

---

## Configuração do Redis 🚀

### Arquivo: `redis.database.config.ts`

A configuração do Redis é tratada aqui. Ele obtém os detalhes da conexão usando o `ConfigService` e configura o cliente Redis.

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

### Como é usado

A função `connectRedisDatabase` é usada no `main.ts` para configurar e conectar o Redis.

```ts
import { connectRedisDatabase } from './config/database/redis.database.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  connectRedisDatabase(app.get(ConfigService))
  // ...
}
```

---

## Conclusão

Os arquivos de configuração gerenciam os detalhes de conexão para MongoDB, MySQL e Redis. Todos eles dependem de variáveis de ambiente fornecidas no arquivo `.env` e são chamados no `main.ts` para configurar as conexões. Certifique-se de atualizar seu arquivo `.env` com as credenciais corretas e executar `docker-compose up` para iniciar tudo.

Olha como ficou bonitinho a aplicação rodando com as bases de dados conectadas

![Base de Dados Conectada](../img/003.png 'Base de Dados Conectada')

[voltar](table-of-contents.md)
