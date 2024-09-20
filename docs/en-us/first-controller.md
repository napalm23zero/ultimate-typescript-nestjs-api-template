# First Controller: The Ping

### Introduction

Alright, rookies, it's time to dive in and build your **first ever controller**. This is a "ping" controller – you know, the thing that other applications (APIs, front-end, mobile apps, IOT devices, or whatever _random thing_ you're working on) will use to see if your back-end is even alive. Think of it like the backend’s way of saying, “Yo, I’m still here!”

### Step 1: Creating the Ping Controller

First, let’s get our hands dirty by creating `src/controller/ping.controller.ts`. Now, what's a controller, you ask? It's basically the **frontline soldier** of your backend app – the access point where the outside world (aka everyone who needs your API) will reach into your backend. Treat it with respect.

In the `ping.controller.ts` file, add this little gem of code:

```typescript
import { Controller, Get, Injectable } from '@nestjs/common'

@Controller('ping')
@Injectable()
export class PingController {
  @Get()
  async ping() {
    return 'That works!'
  }
}
```

Yes, that’s it. No more, no less.

### Step 2: Import the Controller

But wait! Don’t go thinking you’re done just yet. Your controller is like a ninja in the shadows until you **import it** in the `src/app.module.ts`. The **module** file is the all-knowing, all-seeing grandmaster. It makes resources (like your shiny new controller) available to the rest of the app.

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

Pro tip: **If you forget to include your controller here, it’s basically dead to the app.** Not imported, not working – simple as that.

### Step 3: Running the Application

Now that you’ve done your part like a good developer, it’s time to see if this thing actually works. Run the following command:

```bash
npm run start:dev
```

And let the terminal show you some love with the following output:

```bash
Debugger attached.
[Nest] 6581  - 09/16/2024, 11:05:24 PM     LOG [NestFactory] Starting Nest application...
[Nest] 6581  - 09/16/2024, 11:05:24 PM     LOG [InstanceLoader] AppModule dependencies initialized +31ms
[Nest] 6581  - 09/16/2024, 11:05:24 PM     LOG [RoutesResolver] PingController {/ping}: +44ms
[Nest] 6581  - 09/16/2024, 11:05:24 PM     LOG [RouterExplorer] Mapped {/ping, GET} route +5ms
[Nest] 6581  - 09/16/2024, 11:05:24 PM     LOG [NestApplication] Nest application successfully started +5ms
Application is running on: http://localhost:3000
```

### Step 4: Testing it Out

Now for the moment of truth. Open up your browser (or whatever tool you use), and hit this:

```
http://localhost:3000/ping
```

And **BOOM!** You should see the text: **"That works!"** If not, well, double-check your port, your configuration, or just your entire life choices.

**Congrats!** You've officially created your first controller. Now go brag about it to your fellow devs.

---

[back](table-of-contents.md)
