# Criando e Executando Seu Primeiro Projeto NestJS

Bem-vindo, jovem Padawan! É hora de elevar seu jogo e entrar no mundo do NestJS. Siga estes passos para configurar seu projeto, e que o TypeScript esteja com você.

## 1. Criando o Projeto NestJS

Primeiro, abra o terminal e execute o seguinte comando para criar um projeto NestJS novinho em folha:

```bash
nest new ultimate-typescript-nestjs-api-template
```

Isso criará um novo projeto dentro de uma pasta chamada `ultimate-typescript-nestjs-api-template`. Se você já estiver na pasta onde quer o projeto, não entre em pânico. Apenas mova o conteúdo da nova pasta para o diretório atual como um verdadeiro profissional:

```bash
cp -R ./ultimate-typescript-nestjs-api-template/* ./
```

Parabéns, você acaba de dominar a primeira parte da sua jornada!

## 2. Executando Seu Projeto NestJS

Agora que você tem o projeto NestJS configurado, é hora de despertar o servidor. Para iniciar o projeto, use o seguinte comando:

```bash
npm run start
```

Se você tiver sorte (e seguir as instruções), o terminal mostrará que o projeto está pronto. Procure algo assim na saída:

```bash
Nest application successfully started
```

## 3. Acessando Seu Aplicativo Rodando

Por padrão, seu app NestJS estará acessível em:

```
http://localhost:3000
```

Mas... se você estiver rodando dentro de um DevContainer, Docker ou algo mais chique e alterou o mapeamento de portas no `docker-compose.yaml`, então acesse a porta que você mapeou, por exemplo:

```
http://localhost:3090
```

(Se você mapeou para outra porta, use-a. Não sou vidente... ainda.)

## 4. Considerações Finais

Você conseguiu! Criou, executou e acessou seu próprio app NestJS. Esta é apenas a primeira etapa da sua jornada na galáxia das APIs. Então, prepare-se, continue praticando e mantenha-se longe do lado sombrio das más práticas de programação.

Próxima parada: construir uma API intergaláctica.

---

_Nota:_ Sempre verifique a configuração da porta e certifique-se de que ela está corretamente definida no seu ambiente ou configuração Docker. E sim, você provavelmente vai esquecer disso pelo menos uma vez. Todos nós esquecemos.

[voltar](table-of-contents.md)
