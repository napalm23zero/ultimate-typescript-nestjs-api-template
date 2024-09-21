# Clean Architecture

## Uma Imersão Rápida na Clean Architecture

Clean Architecture é muito mais do que apenas uma palavra da moda—é o guia para desenvolvedores que se recusam a viver em um mundo de código espaguete emaranhado. Criada pela primeira vez por Uncle Bob (Robert C. Martin) por volta de 2012, foi projetada para alcançar a **separação de responsabilidades** enquanto mantém nosso código flexível, escalável e testável.

Este estilo arquitetônico não se trata apenas de empilhar camadas—é sobre criar um sistema que possa suportar as demandas caóticas do desenvolvimento de software moderno sem perder o fôlego. A Clean Architecture incentiva a independência de frameworks, bancos de dados e sistemas externos. Ela nos permite focar na lógica de negócios central, e o resto? Bem, pode ser trocado sempre que necessário.

### Os Quatro Pilares da Clean Architecture:

1. **Entidades (Camada de Domínio)**:
   Este é o _por quê_ do seu sistema—as regras de negócios e a lógica central. As entidades são o coração e a alma da sua aplicação, e no nosso caso, as definimos através de `_GenericEntity`. Aqui também definimos os **repositórios**, porque, sejamos sinceros, nossa camada de domínio deve se preocupar com a lógica de negócios e persistência. Você não quer que suas entidades comecem a fazer coisas estranhas.

2. **Casos de Uso (Camada de Aplicação)**:
   Este é o _como_. Seus **serviços** (como o `_GenericService`) vivem aqui e são responsáveis pelas ações que seu sistema precisa executar. Esta camada contém as regras de negócios específicas para uma aplicação particular e não se preocupa com sistemas externos como bancos de dados ou a web.

3. **Adaptadores de Interface (Camada de Apresentação)**:
   Controllers e mapeadores pertencem a esta camada. Eles sabem como converter dados do mundo exterior em algo que a aplicação pode entender e vice-versa. No nosso setup, o `_GenericController` vive nesta camada, lidando com requisições HTTP e encaminhando-as para a camada de aplicação.

4. **Frameworks & Drivers (Camada de Infraestrutura)**:
   Esta é a camada mais externa, a camada do _mundo real_, onde coisas como bancos de dados, frameworks web ou serviços de terceiros estão presentes. Você injeta dependências nas outras camadas por meio desta camada, mas é construída de maneira que, se você decidir trocar de framework ou banco de dados, sua lógica central permanece intacta.

## Independência em Sua Melhor Forma

Uma das principais ideias por trás da Clean Architecture é a **independência**. Cada camada é independente das camadas acima dela. Por exemplo, sua **camada de domínio** não sabe (ou se importa) como os dados são buscados de um banco de dados, apenas que isso precisa acontecer. Isso significa que você pode trocar frameworks, bancos de dados ou APIs externas sem precisar se preocupar.

## Como Este Código Segue a Clean Architecture

Certo, chega de teoria—vamos destrinchar como este código aplica os princípios da Clean Architecture de maneira prática e aprovada por nerds:

### Camada de Domínio:

Aqui, temos as **entidades** que representam os dados centrais da nossa aplicação. A estrela do show é o `_GenericEntity`, que define propriedades comuns como `id`, `createdAt` e `updatedAt`—todas cruciais para rastrear suas entidades.

Mas espere, tem mais! Também temos os **repositórios** nesta camada, especificamente o `_GenericRepository`. Por que na camada de domínio, você pergunta? Porque nossa lógica de domínio deve se preocupar com como os dados são gerenciados, mas não precisa saber como isso é feito. O repositório abstrai isso, fornecendo uma interface limpa para nossos serviços interagirem.

Em resumo, a camada de domínio é onde a lógica vive e respira, completamente alheia a detalhes específicos de frameworks ou bancos de dados.

### Camada de Aplicação:

Os **serviços** vivem aqui—essas criaturas magníficas que recebem as requisições e fazem sua mágica. No nosso caso, o `_GenericService` lida com a lógica de negócios e sabe como validar, mapear e processar as requisições sem nunca saber como os dados são armazenados ou recuperados.

Os serviços são responsáveis por traduzir a lógica de negócios em ações concretas, orquestrar interações entre a camada de domínio (entidades) e a infraestrutura (repositórios), e garantir que tudo funcione perfeitamente.

### Camada de Apresentação (Adaptadores de Interface):

Esta camada é sobre interfaces. **Controllers** e **mapeadores** vivem aqui para lidar com a comunicação entre o mundo exterior e a aplicação. Nosso `_GenericController` é um exemplo perfeito—ele expõe operações CRUD para o cliente sem precisar conhecer os detalhes internos da lógica de negócios ou da persistência.

O objetivo aqui é simples: receber requisições, passá-las para a camada de aplicação e retornar as respostas apropriadas. Esta camada garante que a lógica central da aplicação permaneça agnóstica à forma como é apresentada.

### Camada de Infraestrutura:

Esta camada lida com **frameworks, bancos de dados e serviços de terceiros**. Embora nosso código seja amplamente abstraído desses detalhes, a infraestrutura é onde coisas como a lógica de conexão com o banco de dados são definidas. Graças à injeção de dependências, essa camada garante que sistemas externos possam ser trocados sem tocar na lógica central.

### Repositórios na Clean Architecture:

No nosso caso, os **repositórios** estão solidamente na **camada de domínio**. Eles abstraem a lógica de persistência e permitem que nossos serviços trabalhem com entidades sem se preocupar com como os dados são salvos ou recuperados. Seja você trabalhando com SQL, NoSQL ou sistema de arquivos, os repositórios são sua ponte para o mundo externo, mantendo sua lógica de domínio limpa.

## Vantagens Desta Implementação da Clean Architecture:

### 1. Escalabilidade:

A separação em camadas significa que você pode escalar o sistema facilmente sem acoplar seu código a um framework ou banco de dados específico.

### 2. Testabilidade:

Cada componente é isolado, o que torna os testes unitários muito mais simples. Você pode simular dependências como repositórios e testar os serviços de maneira isolada.

### 3. Manutenibilidade:

Ao aderir aos princípios SOLID e à separação de responsabilidades, esta arquitetura garante que sua base de código seja mais fácil de manter ao longo do tempo. Mudanças em uma camada não irão reverberar por todo o sistema.

### 4. Flexibilidade:

Trocar frameworks, bancos de dados ou APIs não é mais um pesadelo. Sua lógica de negócios central permanece intacta e apenas as camadas externas (frameworks, bancos de dados) precisam de ajustes.

## Conclusão:

A implementação da Clean Architecture neste código mantém tudo organizado, estruturado e fácil de manter. Com camadas e responsabilidades claramente definidas, é fácil de estender, depurar e testar. Além disso, mantém o código nerd e profissional—do jeito que gostamos.

Este código segue as **melhores práticas** da Clean Architecture, e você pode ter certeza de que, à medida que sua aplicação crescer, essa estrutura vai apoiá-la sem se transformar em um emaranhado. Bem-vindo ao lado limpo!

---

[voltar](table-of-contents.md)
