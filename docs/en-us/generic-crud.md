# Generic CRUD

## The Goal: A Generic CRUD That Avoids Repetitive Code

You’re looking at a **super elegant** way to create a generic CRUD in NestJS. The idea? Avoid the plague of repetitive boilerplate code that has haunted developers for years.

By using this setup, you can create CRUD operations for any entity without rewriting the same dull lines over and over again. It’s the ultimate **DRY** (Don't Repeat Yourself) approach.

## File Breakdown

### 1. \_GenericController

- **What It Does**: Provides abstract CRUD operations for any entity you pass to it. Instead of writing "find all", "find one", "update", etc., for each entity, you define it once here and reuse it.
- **How to Use**: Extend this controller in your specific entity controllers. Done. Your life just got easier.

### 2. \_GenericService

- **What It Does**: Handles the business logic for CRUD operations, validation, and error handling. Think of it as the brain behind the scenes, making sure everything runs smoothly.
- **How to Use**: Use this service in your controllers to delegate actual logic. The service knows how to validate, map DTOs, and interact with repositories. Extend this service when needed.

### 3. \_GenericRepository

- **What It Does**: Abstracts database interactions using TypeORM. This bad boy deals with all the boring database CRUD operations so you don't have to.
- **How to Use**: Inject it in your services, and let it take care of the persistence for you.

### 4. \_GenericApiFactory

- **What It Does**: A factory that dynamically creates API controllers based on the entities you provide. It’s like a CRUD controller wizard—just pass it what you need, and boom, you have a fully functional controller.
- **How to Use**: Call this factory function with your entity names, DTOs, and services, and it will magically create your API controller.

### 5. \_GenericMapper

- **What It Does**: Maps between DTOs (Data Transfer Objects) and entities. You don’t want your entity exposed directly to the outside world, so this helps translate them back and forth.
- **How to Use**: Implement this interface to create entity-to-DTO mapping logic for your specific entities.

### 6. \_GenericValidator

- **What It Does**: Validates your DTOs before they hit the database. We don't want bad data, so this guy makes sure everything is in order.
- **How to Use**: Implement this to validate incoming data. If something’s wrong, it’ll throw an exception.

### 7. \_Generic Decorators & Swagger Integration

- **What They Do**: These decorators help automatically generate your Swagger documentation, making your API look polished without breaking a sweat.
- **How to Use**: Apply these decorators in your API controllers, and watch as Swagger documentation builds itself.

### Why This Strategy Rocks

- **Scalability**: You can add new entities without writing the same CRUD code every time.
- **Maintainability**: If you need to make changes, you do it in one place, and it affects all entities.
- **Consistency**: No more “I forgot to handle this edge case for this one controller” nonsense.
- **Best Practices**: We’re using **Clean Architecture**, **DRY** principles, and **SOLID** design patterns, which means your codebase will look professional and nerd-approved.
- **Swagger-Ready**: With the included decorators, your API will be documented automatically—making it easier to maintain and for others to understand.

This setup is a life-saver for anyone who wants a robust, scalable, and DRY-compliant CRUD system. It’s the ultimate approach to keep your codebase **clean, nerdy, and professional**.

Enjoy your streamlined development! 🔥

---

[back](table-of-contents.md)
