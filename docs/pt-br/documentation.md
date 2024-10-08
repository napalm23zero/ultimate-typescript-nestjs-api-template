# Documentando Sua Aplicação com Swagger

### Introdução

Bem-vindo à era da **documentação automática de APIs**. Acabou o tempo de fazer tudo manualmente (porque, convenhamos, ninguém tem tempo para isso, né?). Estamos abraçando o **Swagger** (ou **OpenAPI** para impressionar na reunião). O Swagger tem dois propósitos:

1. Oferece uma maneira mais amigável para os usuários interagirem com os endpoints da sua aplicação.
2. Ajuda os desenvolvedores a saber exatamente o que você espera receber e o que vai enviar de volta. Nada de adivinhações!

### Passo 1: Instalando o Swagger

Primeiro de tudo, precisamos instalar o Swagger. É simples, basta rodar este comando:

```bash
npm i @nestjs/swagger
```

Feito? Ótimo, você está no caminho da grandiosidade.

### Passo 2: Criando um Arquivo de Configuração

Agora que somos **organizados** (ou pelo menos fingimos ser), vamos criar um arquivo de configuração para o Swagger. Coloque isso em `src/config/swagger.config.ts`:

```typescript
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Template Definitivo de API Typescript com NestJS')
    .setDescription('Este é o template definitivo para uma API Typescript com NestJS')
    .setVersion('1.0')
    .addTag('template-definitivo-api-nestjs')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
```

Por que fazer isso? Porque ter tudo centralizado e organizado num arquivo só facilita a vida, e você vai se sentir um desenvolvedor profissional ao fazer isso.

### Passo 3: Integrando o Swagger ao Projeto

Com o arquivo de configuração pronto, é hora de integrar o Swagger na sua aplicação. Vá para `src/main.ts` e adicione o seguinte:

```typescript
// Configurar documentação do Swagger
setupSwagger(app)
```

E não seja a pessoa que esquece de importar a função `setupSwagger`. Adicione isto também:

```typescript
import { setupSwagger } from 'src/config/swagger.config'
```

Você não quer que a configuração do Swagger desapareça no vazio, certo?

### Passo 4: Testando

Pronto! Agora é só rodar sua aplicação e acessar:

```
http://localhost:3000/api
```

Você verá algo mais ou menos assim:

![Exemplo Swagger](../img/001.png 'Swagger')

Sinta-se à vontade para clicar em **"Try out"** se estiver se sentindo corajoso. Quando fizer isso, verá algo assim como resposta:

![Teste Swagger](../img/002.png 'Teste Swagger')

---

**Parabéns, você agora é um mago do Swagger!** Sua aplicação está documentada automaticamente, seus colegas desenvolvedores não precisarão ser videntes para entender como usar sua API, e você pode se autodenominar _chique_. 🎉

---

[back](table-of-contents.md)
