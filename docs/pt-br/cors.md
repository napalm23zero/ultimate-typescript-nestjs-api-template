# Configuração de CORS na Nossa Aplicação

Bem-vindo à **saga do CORS**, onde manejamos a segurança implacável. Vamos passar por como o **CORS** (Cross-Origin Resource Sharing) é tratado nesta aplicação NestJS. Segure-se.

## O que é CORS?

Imagine sua API como um lounge VIP chique, e todas as requisições que chegam são possíveis penetras. O **CORS** é o segurança que garante que apenas domínios confiáveis (como seus URLs de produção) tenham acesso. Em termos simples, é um mecanismo que permite (ou nega) que apps da web de um domínio interajam com recursos de outro domínio. Sem ingresso? Sem entrada. E nem tente conversar com o segurança.

## As Principais Mudanças

### `src/config/cors.config.ts`

Na nossa aplicação, temos uma configuração personalizada para o CORS. O **segurança do CORS** está configurado usando a função `setupCors()`. Aqui está o que ela faz:

- **Controle de Origem**: Em desenvolvimento, permitimos qualquer origem (\*). Mas em produção, apenas os **escolhidos** (domínios confiáveis) são permitidos. Isso garante que sua API não vire um playground público.
- **Métodos Permitidos**: Apenas os métodos que consideramos dignos (`GET`, `POST`, `DELETE`, etc.) podem passar. Se sua requisição usar outro método, adivinha só? Tá fora.
- **Headers Permitidos**: Não queremos headers suspeitos se infiltrando, então apenas headers como `Content-Type` e `Authorization` são permitidos.
- **Headers Expostos**: Permitimos que você dê uma espiada em alguns headers, como `Content-Length` e `Content-Type`. Não abuse.
- **Credenciais**: Sim, aceitamos cookies (e outras credenciais) sendo passados. Mas só porque confiamos em você.
- **Requisições Preflight**: Cuidamos para que essas requisições irritantes de **OPTIONS** sejam resolvidas rapidamente, com uma resposta 204 limpa e rápida. Sem drama.

### Habilitando o CORS em `main.ts`

Agora que construímos nossa fortaleza de CORS, vamos habilitá-la em `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupCors } from './config/cors.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuração de CORS com configuração personalizada
  app.enableCors(setupCors())

  await app.listen(3000)
}
bootstrap()
```

Aqui é onde a mágica acontece: o `enableCors(setupCors())` é como apertar o botão "ativar escudos". Agora você está protegido contra as forças sombrias de requisições não confiáveis.

## Por Que Você Deveria Se Importar?

Porque sem CORS, sua aplicação estaria vulnerável a _ataques cross-origin_. Sem mencionar que poderia virar o Velho Oeste das APIs, onde qualquer um de qualquer lugar pode tentar a sorte. Não queremos isso.

Resumindo: **CORS** garante que apenas as pessoas certas, dos lugares certos, possam acessar seus recursos valiosos.

---

## Considerações Finais

Com nossa configuração personalizada de CORS, você é como o Mestre Jedi da sua API, defendendo seu reino com uma estratégia de defesa perfeitamente equilibrada. E se alguma origem suspeita tentar invadir? Ela será recebida com uma rejeição rápida e implacável.

"Essas não são as requisições que você está procurando." Siga em frente.

---

[back](table-of-contents.md)
