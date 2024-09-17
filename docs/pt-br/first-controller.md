# Primeiro Controller: O Ping

### Introdução

Beleza, novatos, é hora de mergulhar e construir seu **primeiro controller**. Este é um controller de "ping" – sabe, aquele que outras aplicações (APIs, front-end, aplicativos mobile, dispositivos IoT, ou qualquer _outra coisa aleatória_ com a qual você esteja trabalhando) vão usar para verificar se o seu back-end está funcionando. Pense nisso como a forma do back-end de dizer: “E aí, ainda estou aqui!”

### Passo 1: Criando o Controller de Ping

Primeiro, vamos colocar a mão na massa criando o arquivo `src/controller/ping.controller.ts`. Agora, você deve estar se perguntando: o que é um controller? Basicamente, é o **soldado da linha de frente** do seu app de back-end – o ponto de acesso onde o mundo exterior (ou seja, todos que precisam da sua API) vai interagir com o seu back-end. Trate isso com respeito.

No arquivo `ping.controller.ts`, adicione essa pequena joia de código:

```typescript
import { Controller, Get, Injectable } from '@nestjs/common'

@Controller('ping')
@Injectable()
export class PingController {
  @Get()
  async ping() {
    return 'Está funcionando!'
  }
}
```

Sim, só isso. Nem mais, nem menos.

### Passo 2: Importando o Controller

Mas espere! Não vá achando que já terminou. Seu controller é como um ninja nas sombras até que você **importe ele** no arquivo `src/app.module.ts`. O arquivo de **módulo** é o grande mestre onisciente. Ele disponibiliza os recursos (como o seu novo controller) para o restante do app.

```typescript
import { Module } from '@nestjs/common'
import { PingController } from './controller/ping.controller'
@Module({
  imports: [],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
```

Dica profissional: **Se você esquecer de incluir seu controller aqui, ele basicamente não existe no app.** Não importou, não funciona – simples assim.

### Passo 3: Executando a Aplicação

Agora que você fez sua parte como um bom desenvolvedor, é hora de ver se isso realmente funciona. Execute o seguinte comando:

```bash
npm run start:dev
```

E deixe o terminal te dar um pouco de carinho com a seguinte saída:

```bash
Debugger attached.
[Nest] 6581  - 16/09/2024, 23:05:24     LOG [NestFactory] Iniciando a aplicação Nest...
[Nest] 6581  - 16/09/2024, 23:05:24     LOG [InstanceLoader] Dependências do AppModule inicializadas +31ms
[Nest] 6581  - 16/09/2024, 23:05:24     LOG [RoutesResolver] PingController {/ping}: +44ms
[Nest] 6581  - 16/09/2024, 23:05:24     LOG [RouterExplorer] Rota mapeada {/ping, GET} +5ms
[Nest] 6581  - 16/09/2024, 23:05:24     LOG [NestApplication] Aplicação Nest iniciada com sucesso +5ms
Aplicação rodando em: http://localhost:3000
```

### Passo 4: Testando

Agora chegou o momento da verdade. Abra seu navegador (ou qualquer outra ferramenta que você use) e acesse o seguinte endereço:

```
http://localhost:3000/ping
```

E **BOOM!** Você deve ver o texto: **"Está funcionando!"** Se não, bem, confira novamente sua porta, sua configuração ou suas escolhas de vida inteiras.

**Parabéns!** Você oficialmente criou seu primeiro controller. Agora vá se gabar disso para seus colegas devs.

[voltar](table-of-contents.md)
