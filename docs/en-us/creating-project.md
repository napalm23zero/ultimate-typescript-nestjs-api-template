# Creating and Running Your First NestJS Project

Welcome, young Padawan! It’s time to step up your game and enter the realm of NestJS. Follow these steps to set up your project, and may the TypeScript be with you.

## 1. Creating the NestJS Project

First, open up your terminal and run the following command to create a shiny new NestJS project:

```bash
nest new ultimate-typescript-nestjs-api-template
```

This will create a new project inside a folder called `ultimate-typescript-nestjs-api-template`. If you're already standing in the folder where you want the project, don't panic. Just move the contents of the newly created folder into your current directory like a pro:

```bash
cp -R ./ultimate-typescript-nestjs-api-template/* ./
```

Congratulations, you've just mastered the first part of your journey!

## 2. Running Your NestJS Project

Now that you have your NestJS project in place, it’s time to awaken the server. To start your project, use this command:

```bash
npm run start
```

If you’re lucky (and you followed the instructions), the terminal will tell you that your project is ready to rock. Look for something like this in the output:

```bash
Nest application successfully started
```

## 3. Accessing Your Running Application

By default, your NestJS app will be accessible at:

```
http://localhost:3000
```

But... if you’re running inside a DevContainer, or Docker, or maybe you're just feeling extra fancy and changed the port mapping in your `docker-compose.yaml`, then access it on the port you mapped, for example:

```
http://localhost:3090
```

(If you mapped it to something different, use that instead. I’m not a mind reader... yet.)

## 4. Final Thoughts

You did it! You've created, run, and accessed your very own NestJS app. This is just the beginning of your journey into the API galaxy. So, gear up, keep practicing, and stay away from the dark side of bad coding practices.

Next stop: building an intergalactic API.

---

_Note:_ Always check your port configuration and ensure it's correctly set in your environment or Docker setup. And yes, you’ll probably forget this at least once. We all do.

---

[back](table-of-contents.md)
