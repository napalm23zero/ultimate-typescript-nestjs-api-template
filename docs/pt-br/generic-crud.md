# CRUD Genérico

## O Objetivo: Um CRUD Genérico Que Evita Código Repetitivo

Você está olhando para uma maneira **super elegante** de criar um CRUD genérico no NestJS. A ideia? Evitar a praga de código repetitivo que tem assombrado desenvolvedores por anos.

Usando esta configuração, você pode criar operações CRUD para qualquer entidade sem reescrever as mesmas linhas chatas repetidamente. É a abordagem definitiva do **DRY** (Don't Repeat Yourself, ou "Não se Repita").

## Descrição dos Arquivos

### 1. \_GenericController

- **O Que Ele Faz**: Fornece operações CRUD abstratas para qualquer entidade que você passar para ele. Em vez de escrever "buscar todos", "buscar um", "atualizar", etc., para cada entidade, você define isso uma vez aqui e reutiliza.
- **Como Usar**: Estenda este controller nos controllers das suas entidades específicas. Pronto. Sua vida acaba de ficar mais fácil.

### 2. \_GenericService

- **O Que Ele Faz**: Lida com a lógica de negócios para operações CRUD, validação e tratamento de erros. Pense nele como o cérebro por trás das cenas, garantindo que tudo funcione perfeitamente.
- **Como Usar**: Use este serviço em seus controllers para delegar a lógica real. O serviço sabe como validar, mapear DTOs e interagir com repositórios. Estenda este serviço quando necessário.

### 3. \_GenericRepository

- **O Que Ele Faz**: Abstrai as interações com o banco de dados usando o TypeORM. Este cara cuida de todas as operações CRUD chatas do banco de dados, para que você não precise se preocupar.
- **Como Usar**: Injete-o em seus serviços e deixe-o cuidar da persistência para você.

### 4. \_GenericApiFactory

- **O Que Ele Faz**: Uma fábrica que cria dinamicamente controllers de API com base nas entidades que você fornecer. É como um assistente mágico de controller CRUD—basta passar o que você precisa e, pronto, você tem um controller totalmente funcional.
- **Como Usar**: Chame esta função de fábrica com os nomes das suas entidades, DTOs e serviços, e ela criará magicamente seu controller de API.

### 5. \_GenericMapper

- **O Que Ele Faz**: Faz o mapeamento entre DTOs (Data Transfer Objects) e entidades. Você não quer expor suas entidades diretamente para o mundo externo, então isso ajuda a traduzir entre elas.
- **Como Usar**: Implemente esta interface para criar a lógica de mapeamento de entidade-para-DTO para suas entidades específicas.

### 6. \_GenericValidator

- **O Que Ele Faz**: Valida seus DTOs antes que eles sejam persistidos no banco de dados. Não queremos dados ruins, então esse cara garante que tudo esteja em ordem.
- **Como Usar**: Implemente isso para validar os dados recebidos. Se algo estiver errado, ele lançará uma exceção.

### 7. \_Generic Decorators & Integração com Swagger

- **O Que Eles Fazem**: Esses decorators ajudam a gerar automaticamente sua documentação Swagger, fazendo sua API parecer polida sem muito esforço.
- **Como Usar**: Aplique esses decorators em seus controllers de API e observe a documentação Swagger sendo gerada automaticamente.

### Por Que Esta Estratégia é Incrível

- **Escalabilidade**: Você pode adicionar novas entidades sem precisar escrever o mesmo código CRUD repetidamente.
- **Manutenibilidade**: Se você precisar fazer alterações, basta fazer em um lugar e isso afeta todas as entidades.
- **Consistência**: Nada mais de "Esqueci de lidar com este caso especial para este controller".
- **Melhores Práticas**: Estamos usando os princípios da **Clean Architecture**, **DRY** e **SOLID**, o que significa que sua base de código parecerá profissional e aprovada pelos nerds.
- **Pronto para Swagger**: Com os decorators incluídos, sua API será documentada automaticamente—tornando mais fácil de manter e para que outros entendam.

Este setup é uma salvação para quem quer um sistema CRUD robusto, escalável e compatível com DRY. É a abordagem definitiva para manter sua base de código **limpa, nerd e profissional**.

Aproveite seu desenvolvimento otimizado! 🔥

---

[voltar](table-of-contents.md)
