# Limitador de Requests

Bem-vindo ao guia sobre como implementamos a limitador de requests em uma aplicação NestJS. Pegue um café, porque estamos prestes a mergulhar fundo nas melhores práticas. E sim, haverá piadas — mas apenas para os _profissionais_ sérios.

## Por que limitador de requests?

Primeiro, vamos falar sobre o elefante na sala. Por que se preocupar com limitador de requests?

Em um mundo ideal, cada usuário faria exatamente a quantidade de requisições que o seu servidor consegue lidar. Mas aqui na realidade, bots, usuários ansiosos e _aquele cliente específico_ podem bombardear seus servidores. A limitador de requests protege sua API contra abusos, definindo um teto para quantas requisições um cliente pode fazer em um período de tempo específico.

No nosso setup, estamos usando Redis para o armazenamento, porque armazenamento local já está fora de moda. O Redis nos oferece velocidade, confiabilidade e... cache!

## Estrutura de Pastas

Aqui está o que estamos trabalhando:

```
src/
│
├── config/
│   ├── rate-limit.config.ts
├── app.module.ts
.env.development
```

## Configuração de limitador de requests (`rate-limit.config.ts`)

Então, como configuramos a limitador de requests? Com o **ThrottlerModule** e um serviço customizado de **RedisThrottlerStorageService**.

Começamos configurando o `ThrottlerModule` no módulo da aplicação (`app.module.ts`). O NestJS fornece um pacote integrado para limitador de requests, mas não somos básicos — precisamos aumentar o nível usando Redis como nosso armazenamento.

Aqui está um resumo das partes mais importantes do arquivo de configuração:

- **Limite de Requests**: Quantas requisições você tolera antes de o cliente ser limitado.
- **TTL (Time to Live)**: A janela de tempo (em segundos) para a limitação. Após esse tempo, a contagem é redefinida. É como dar ao usuário um "Cartão de Saída Livre da Prisão".
- **Duração do Bloqueio**: Quanto tempo eles ficarão bloqueados após atingirem o limite. Esta é a “punição” por quebrar as regras.

Configuramos essas definições puxando elas de variáveis de ambiente — o que significa que você pode ajustar sua aplicação para diferentes ambientes.

## Armazenamento Customizado com Redis

Redis é nosso armazenamento de escolha porque sejamos honestos — quem não ama a velocidade da memória? Definimos um serviço customizado que estende o armazenamento padrão do throttler no NestJS. Esse serviço interage com o Redis, armazenando a contagem de requisições e verificando se um usuário deve ser bloqueado.

É como ter o **Darth Vader** rastreando quantas vezes alguém o incomoda. Após o limite, você é estrangulado pela Força — ou, no nosso caso, limitado por taxa.

### Componentes-Chave:

- `RedisThrottlerStorageService`: O serviço customizado que gerencia as contagens e expirações no Redis.
- `increment()`: Incrementa a contagem de requisições para um cliente e verifica se ele deve ser bloqueado. Este método é como contar quantas vezes alguém clica em "atualizar" na sua aplicação.
- `reset()`: Limpa a contagem de requisições. Todos merecem uma segunda chance, certo?

## O Guardião: Custom ThrottlerGuard

O **ThrottlerGuard** é onde a mágica acontece. Este guard verifica se o usuário ultrapassou o limite de requisições e lança uma exceção se tiver. Mas não estamos apenas entregando o erro padrão de "muitas requisições" — não, não, não. Nossas mensagens de erro são personalizadas porque somos profissionais.

O guard usa o `CustomThrottlerGuard`, que estende o `ThrottlerGuard` base. Quando o cliente é limitado, ele informa gentilmente para "acelerar menos, cowboy".

### Principais Destaques:

- **Mensagem de Limitação**: Uma mensagem customizável extraída das variáveis de ambiente que informa aos usuários quando foram bloqueados.
- **Rastreamento de Requisições**: Cada requisição é rastreada pelo endereço IP (ou você pode personalizar isso). É como construir um rastro digital de seus clientes mais persistentes.
- **Logging**: Registramos os acessos para análise. Sim, registramos tudo porque — adivinhe — **logs são seus melhores amigos**.

## Configuração de Variáveis de Ambiente

As variáveis de ambiente estão em `environment/.env.development`, e aqui está como as configuramos para o desenvolvimento local:

```
# Rate Limit Config
THROTTLE_LIMIT=10
THROTTLE_TTL=60
THROTTLE_BLOCK_DURATION=60
THROTTLE_MESSAGE="Too many requests, slow down cowboy!"
```

### Resumo:

- **THROTTLE_LIMIT**: O número máximo de requisições permitidas.
- **THROTTLE_TTL**: Quanto tempo (em segundos) antes que a contagem seja reiniciada.
- **THROTTLE_BLOCK_DURATION**: Quanto tempo um usuário é bloqueado após atingir o limite.
- **THROTTLE_MESSAGE**: A mensagem que enviamos aos usuários uma vez que são bloqueados. (Sinta-se à vontade para customizar com mais estilo.)

## Por que Esse Setup é Importante

1. **Escalável e Flexível**: Usando Redis, esse setup pode escalar para lidar com milhares de clientes sem degradação de performance. O Redis é rápido e pode armazenar uma grande quantidade de registros de acessos de forma eficiente.
2. **Customizável**: Tudo, desde os limites de requisições até as mensagens de erro, pode ser customizado. É flexível o suficiente para funcionar em qualquer API.
3. **Eficiente**: O Redis garante que a limitador de requests aconteça quase em tempo real, e a aplicação pode bloquear usuários quase instantaneamente uma vez que atinjam o limite.

## Melhores Práticas

- **Defina Limites Razoáveis**: Não limite de forma muito agressiva. Encontre um ponto ideal que equilibre a experiência do usuário com a proteção do servidor.
- **Mensagens de Erro Customizadas**: Seja amigável (ou um pouco sarcástico) com suas mensagens de erro. Isso ajuda a suavizar a frustração de ser limitado.
- **Logging**: Sempre registre as ações de limitador de requests. Isso ajudará na depuração e no entendimento do comportamento dos usuários.
- **Monitoramento**: Fique de olho em quantas vezes os usuários estão sendo limitados. Isso pode revelar alguns gargalos de performance ou áreas para otimizar.

## Response

É isso que você verá depois de fazer muitas requisições!

![Too Many Requests](../img/004.png 'Too Many Requests')

![Too Many Requests2](../img/005.png 'Too Many Requests2')

---

[back](table-of-contents.md)
