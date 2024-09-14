
# Entendendo a Configuração do Seu DevContainer

Neste projeto, a pasta `.devcontainer` é onde toda a mágica do ambiente de desenvolvimento acontece. Usamos Docker para containerizar nossos serviços e garantir que tudo funcione de forma consistente em qualquer máquina. Abaixo está uma visão geral da estrutura da pasta, seguida por uma explicação clara do que cada arquivo faz e como eles funcionam juntos.

## Estrutura da Pasta .devcontainer

```
.devcontainer/
├── dockerfiles/
│   ├── backend.Dockerfile
│   ├── postgres.Dockerfile
│   └── redis.Dockerfile
├── .env
├── devcontainer.json
├── docker-compose.yaml
└── entrypoint.sh
```

Agora vamos entender o propósito de cada arquivo e como eles se juntam para criar seu ambiente de desenvolvimento.

## Explicação dos Arquivos

### 1. `dockerfiles/`

Esta pasta contém os **Dockerfiles** para cada serviço: backend, banco de dados (MySQL) e Redis (para cache). Cada Dockerfile define o ambiente para seu respectivo serviço, garantindo que tudo funcione de maneira suave e consistente, independentemente de onde o ambiente for configurado.

- **backend.Dockerfile**:
  - Este arquivo define o ambiente para o **backend NestJS**. Ele começa com uma imagem Node.js minimalista e instala as dependências necessárias para executar o serviço de backend. O container expõe a porta 3000, onde a API estará disponível.
  
- **postgres.Dockerfile**:
  - Este arquivo configura o container de banco de dados **MySQL**. Usamos uma imagem padrão do MySQL e instalamos algumas ferramentas essenciais. Este setup é ideal para desenvolvimento local e testes, e o container expõe a porta padrão do MySQL (3306).
  
- **redis.Dockerfile**:
  - Este Dockerfile cria um container **Redis**, que lida com o cache. É uma imagem minimalista do Alpine que é rápida e eficiente para desenvolvimento. O container expõe a porta 6379, que é a porta padrão do Redis.

### 2. `.env`

O arquivo `.env` contém as variáveis de ambiente que configuram seus containers. Essas variáveis definem parâmetros críticos, como as portas de cada serviço e as credenciais do banco de dados e do Redis.

- **Portas**: Estas portas são mapeadas para sua máquina local para que você possa acessar os serviços de fora do container (ex.: backend na porta 3090, MySQL na 3091, Redis na 3092).
- **Configuração MySQL**: Nome de usuário, senha, nome do banco de dados e outras opções específicas do MySQL.
- **Configuração Redis**: A senha usada para acessar o Redis.

### 3. `devcontainer.json`

Este é o arquivo de configuração do **DevContainer** no VS Code. Ele informa ao VS Code como configurar o ambiente quando você abre este projeto. Partes principais incluem:
- **dockerComposeFile**: Aponta para o arquivo `docker-compose.yaml`, que orquestra os serviços.
- **postCreateCommand**: Especifica um script para ser executado após a criação do container. Neste caso, ele executa o `entrypoint.sh` para configurar o Git e instalar as dependências.

### 4. `docker-compose.yaml`

Este é o **orquestrador**. Ele define como o Docker deve executar os serviços de backend, MySQL e Redis juntos. Aqui está o que ele faz:
- **Constroi os containers**: Com base nos Dockerfiles na pasta `dockerfiles/`.
- **Exposição de portas**: Mapeia as portas dos containers para sua máquina local para que você possa acessar os serviços.
- **Define volumes**: Garante a persistência dos dados (ex.: dados do banco de dados) mapeando pastas dentro do container para sua máquina local.

### 5. `entrypoint.sh`

Este é um script que é executado após o container iniciar. Ele configura o Git, instala as dependências (se necessário) e adiciona sua chave SSH. Ele automatiza o processo de configuração, então você não precisa configurar essas coisas manualmente a cada vez que o container inicia.

---

## Como Tudo Funciona Junto

- **Configuração do DevContainer**: Quando você abre o projeto no VS Code, o arquivo `devcontainer.json` informa ao VS Code para construir e executar os containers usando o `docker-compose.yaml`.
- **Orquestração de Serviços**: O Docker Compose lança os containers de backend, MySQL e Redis com base em seus respectivos Dockerfiles. Cada serviço roda isoladamente, mas pode se comunicar através da rede interna do Docker.
- **Configuração do Ambiente**: O arquivo `.env` garante que as portas corretas, credenciais e configurações sejam aplicadas a cada container.
- **Automação da Configuração**: O script `entrypoint.sh` é executado automaticamente, configurando o Git, SSH e instalando as dependências do Node.

Essa configuração garante que seu ambiente de desenvolvimento seja consistente e fácil de gerenciar. Cada serviço está contido em seu próprio container Docker, o que significa que você pode executar todo o projeto localmente sem se preocupar com dependências ou configurações conflitantes.

E a melhor parte? Uma vez configurado, tudo que você precisa fazer é executar `docker-compose up`, e está pronto para começar a programar.
