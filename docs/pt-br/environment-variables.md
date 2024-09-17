# Variáveis de Ambiente

Então, você chegou até aqui para descobrir como fazer seu app obedecer seus comandos, dependendo do ambiente em que você está. Bem, sorte sua! Este doc vai te guiar para configurar variáveis de ambiente e como estruturamos tudo para garantir que a configuração correta seja carregada na hora certa.

## Estrutura de Pastas? Aqui está!

Aqui está como seu projeto deve parecer agora:

```
- environment/
    - .env.development
    - .env.production
- src/
    - config/
        - cors.config.ts
        - swagger.config.ts
        - app.module.ts
    - main.ts
.env
```

Vamos detalhar:

- **environment/**: Onde vivem os arquivos mágicos `.env`. Cada ambiente (desenvolvimento, produção) tem seu próprio arquivo `.env`.
- **src/config/**: Onde vivem os arquivos de configuração do projeto (como CORS e Swagger).

## Como os Arquivos `.env` Funcionam?

Cada arquivo `.env` define variáveis específicas para o ambiente. Por exemplo:

#### `environment/.env.development`

```ini
NODE_ENV=development
APP_PORT=3000
ALLOWED_ORIGINS=*
SWAGGER_TITLE=Ultimate Typescript NestJS API Template
SWAGGER_DESCRIPTION=Este é o template supremo para uma API NestJS em Typescript
SWAGGER_VERSION=1.0
```

#### `environment/.env.production`

```ini
NODE_ENV=production
APP_PORT=8000
ALLOWED_ORIGINS=https://your-production-domain.com,https://another-trusted-domain.com
SWAGGER_TITLE=Ultimate Typescript NestJS API Template
SWAGGER_DESCRIPTION=API de Produção para NestJS em Typescript
SWAGGER_VERSION=1.0
```

Cada arquivo define valores para as variáveis de ambiente usadas no aplicativo.

## `main.ts` - O Maestro

No `main.ts`, adicionamos um código maravilhoso para garantir que o arquivo `.env` correto seja carregado de acordo com o seu ambiente. O pacote dotenv faz essa mágica.

Aqui está o destaque:

```typescript
config({ path: `./environment/.env.${process.env.NODE_ENV || 'development'}` })
```

Se você está no modo desenvolvimento (`NODE_ENV=development`), ele carrega o `.env.development`. Se você está em produção (`NODE_ENV=production`), ele carrega o `.env.production`. Simples, certo? Esse é o tipo de simplicidade que dá até orgulho.

## Configuração de CORS

O CORS (porque não confiamos em todo mundo) está configurado no arquivo `cors.config.ts` para usar a variável `ALLOWED_ORIGINS`. Se você está rodando em produção, ele verifica os domínios permitidos no seu `.env.production`. Em desenvolvimento, ele permite tudo (perigoso, mas YOLO no dev).

```typescript
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
```

Isso garante que você não vai permitir que qualquer domínio faça festa com sua API em produção.

## Configuração do Swagger

O Swagger é seu BFF da documentação. Ele te ajuda a interagir com sua API e é configurado no arquivo `swagger.config.ts` usando as configurações do arquivo `.env` como `SWAGGER_TITLE`, `SWAGGER_DESCRIPTION` e `SWAGGER_VERSION`.

```typescript
const config = new DocumentBuilder()
  .setTitle(process.env.SWAGGER_TITLE)
  .setDescription(process.env.SWAGGER_DESCRIPTION)
  .setVersion(process.env.SWAGGER_VERSION)
  .build()
```

## Como Rodar Isso?

- Desenvolvimento? Rode com:
  ```bash
    npm run start dev
  ```
- Produção? Melhor ter cuidado, mas aqui vai:
  ```bash
    npm run start prod
  ```

E é isso! Agora você está no controle total das variáveis de ambiente. Parabéns! Você está a um passo de se tornar um ninja profissional de ambiente.

[voltar](table-of-contents.md)
