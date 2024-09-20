# Conexão e Configuração do Banco de Dados

Então, você resolveu mexer com bancos de dados? Corajoso da sua parte. Vamos garantir que você não estrague tudo.

## Conectando ao MySQL

Primeiro, nosso velho amigo MySQL. Aqui está como se aproximar dele.

### Passo 1: Instale um Cliente MySQL

Se ainda não o fez, escolha um cliente MySQL:

- **MySQL Workbench**: Porque interfaces gráficas são legais.
- **Sequel Pro**: Para usuários de Mac que gostam de se sentir superiores.
- **Linha de Comando**: Para aqueles que gostam de viver perigosamente.

### Passo 2: Detalhes da Conexão

Use as seguintes credenciais. Não erre.

- **Host**: `localhost` ou `127.0.0.1`
- **Porta**: `${HOST_MYSQL_PORT}` (padrão é 3091)
- **Usuário**: `${DEVCONTAINER_MYSQL_USER}` (padrão é `admin`)
- **Senha**: `${DEVCONTAINER_MYSQL_PASSWORD}` (padrão é `darkSide123`)
- **Nome do Banco de Dados**: `${DEVCONTAINER_MYSQL_DATABASE}` (padrão é `ultimate_db`)

Lembre-se de substituir os placeholders pelos valores reais do seu arquivo `.env`. Se você os alterou e esqueceu, problema seu.

### Passo 3: Teste a Conexão

Clique em conectar. Se funcionar, parabéns — você fez o mínimo necessário. Se não, verifique suas configurações. Ou verifique de novo. Faça o que for preciso.

## Conectando ao MongoDB

Quando SQL não é suficiente, entra o MongoDB.

### Passo 1: Instale um Cliente MongoDB

Escolha sua ferramenta:

- **MongoDB Compass**: Porque visuais ajudam.
- **Robo 3T**: Para quem gosta de uma interface ágil.
- **Linha de Comando**: Você é um masoquista.

### Passo 2: Detalhes da Conexão

Aqui está o que você precisa:

- **Host**: `localhost` ou `127.0.0.1`
- **Porta**: `${HOST_MONGO_PORT}` (padrão é 3093)
- **Usuário**: `${DEVCONTAINER_MONGO_INITDB_ROOT_USERNAME}` (padrão é `admin`)
- **Senha**: `${DEVCONTAINER_MONGO_INITDB_ROOT_PASSWORD}` (padrão é `darkSide123`)
- **Banco de Autenticação**: `${DEVCONTAINER_MONGO_INITDB_DATABASE}` (padrão é `ultimate_db`)

Novamente, substitua os placeholders por valores reais. Preste atenção; isso não é ciência de foguetes.

### Passo 3: Teste a Conexão

Tente conectar. Se falhar, bem, talvez o NoSQL signifique "Não, SQL teria sido mais fácil."

## Conectando ao Redis

Para aqueles que apreciam velocidade e não valorizam sua sanidade.

### Passo 1: Instale um Cliente Redis

Suas opções:

- **RedisInsight**: Porque não?
- **Linha de Comando**: Sentindo-se corajoso hoje, não é?

### Passo 2: Detalhes da Conexão

Use estas configurações:

- **Host**: `localhost` ou `127.0.0.1`
- **Porta**: `${HOST_REDIS_PORT}` (padrão é 3092)
- **Senha**: `${DEVCONTAINER_REDIS_PASSWORD}` (padrão é `darkSide123`)

### Passo 3: Teste a Conexão

Conecte-se e tente definir uma chave. Se não funcionar, talvez seja melhor ficar com algo mais simples, como um arquivo de texto.

## Notas Importantes para Iniciantes

- **Containers Devem Estar Rodando**: Não espere milagres. Execute `docker-compose up` antes de tentar se conectar.
- **Verifique suas Portas**: Certifique-se de que está usando as portas corretas definidas no seu arquivo `.env`.
- **Variáveis de Ambiente**: Mantenha seu arquivo `.env` atualizado. Se você mexer nele, assuma.

## Conclusão

Conectar-se a bancos de dados não é tão difícil, mas você ficaria surpreso com a frequência com que as pessoas estragam tudo. Não seja uma dessas pessoas. Siga as instruções, use o cérebro, e você ficará bem. Provavelmente.

---

[back](table-of-contents.md)
