# Entendendo a Configuração do Seu DevContainer

Neste projeto, a pasta `.devcontainer` é onde toda a mágica do ambiente de desenvolvimento acontece. Usamos Docker para containerizar nossos serviços e garantir que tudo funcione de forma consistente em qualquer máquina. Abaixo está uma visão geral da estrutura da pasta, seguida por uma explicação clara do que cada arquivo faz e como eles se juntam para criar seu ambiente de desenvolvimento.

## Estrutura da Pasta .devcontainer

```
.devcontainer/
├── docker-compose.yaml
├── dockerfiles/
│   ├── backend.Dockerfile
│   ├── mysql.Dockerfile
│   ├── redis.Dockerfile
│   └── mongo.Dockerfile
├── .env
├── devcontainer.json
└── entrypoint.sh
```

Agora vamos entender o propósito de cada arquivo e como eles se juntam para criar seu ambiente de desenvolvimento.

### 1. `docker-compose.yaml`

Este é o **orquestrador**. Ele define como o Docker deve executar os serviços de backend, MySQL, Redis e agora o novo **MongoDB**. Com um simples comando (`docker-compose up`), ele garante que cada serviço rode de forma independente, mas com a capacidade de se comunicarem quando necessário.

### 2. `dockerfiles/`

Esta pasta contém os **Dockerfiles** para cada serviço: backend, banco de dados (MySQL), Redis (para cache) e agora MongoDB. Cada Dockerfile define o ambiente para seu respectivo serviço, garantindo que tudo funcione de maneira suave e consistente.

- **backend.Dockerfile**:
  - Define o ambiente para o **backend NestJS**. Ele instala as ferramentas necessárias (como o CLI do NestJS) e prepara o container para servir a API backend na porta 3000. Este é o lugar onde a mágica do desenvolvimento da API acontece.
- **mysql.Dockerfile**:
  - Configura um servidor MySQL padrão para uso em desenvolvimento, expondo a porta 3306 para interações com o banco de dados.
- **redis.Dockerfile**:
  - Configura o **Redis**, um poderoso banco de dados em memória usado para caching. O Redis acelera suas consultas e torna o desenvolvimento mais fluido.
- **mongo.Dockerfile**:
  - A adição mais recente: **MongoDB**, um banco de dados NoSQL. Este Dockerfile prepara o MongoDB para ser executado e expõe a porta 27017.

### 3. `.env`

O arquivo `.env` contém as variáveis de ambiente que configuram seus containers. Ele define, por exemplo, quais portas serão expostas (como 3000 para o backend e 3306 para o MySQL), além de armazenar dados sensíveis como as senhas do banco de dados. Quando o Docker roda os containers, ele usa as informações desse arquivo para configurar os serviços.

### 4. `devcontainer.json`

Este é o arquivo de configuração específico para o **VS Code**. Ele informa ao VS Code como usar o Docker para criar um ambiente de desenvolvimento consistente, com base nas configurações definidas no `docker-compose.yaml`. Ele define:

- Qual serviço do Docker será usado como principal (geralmente o backend),
- Extensões a serem instaladas automaticamente (como Prettier ou ESLint),
- Comandos pós-criação que serão executados após a construção do container, como o script `entrypoint.sh`.

### 5. `entrypoint.sh`

Este é o script que é executado após a inicialização do container. Ele configura o Git (para que você não cometa código como "anônimo") e instala automaticamente as dependências do Node.js. Este script garante que o ambiente de desenvolvimento esteja pronto para uso assim que você abrir o container.

## Por Que Essa Configuração Importa?

1. **Consistência Entre Máquinas**: Todos que trabalham neste projeto terão exatamente o mesmo ambiente de desenvolvimento, independentemente da configuração local.
2. **Separação de Serviços**: Cada serviço (backend, banco de dados, cache, MongoDB) roda em seu próprio container. Isso evita problemas como "funciona na minha máquina" ao colaborar com outras pessoas.
3. **Modular e Escalável**: A arquitetura é projetada para ser facilmente estendida. Quer adicionar outro serviço? Basta escrever um novo Dockerfile e atualizar o `docker-compose.yaml`.

Ao organizar a pasta `.devcontainer` desta forma, você garante que todos os membros da equipe tenham um ambiente consistente e eficiente para trabalhar. É uma ferramenta poderosa tanto para estudo quanto para desenvolvimento — só lembre-se, **não é para produção**.

Agora vá construir algo incrível — e siga as melhores práticas.

[voltar](table-of-contents.md)
