# `@choseohwan/express-utils`

express utilities for @choseohwan project

# Install

### npm

```shell
npm install @choseohwan/express-utils express
```

### yarn

```shell
yarn add @choseohwan/utils express
```

# Utilities

## Application

Abstract class to easily register express app

### Implementation functions

> **initBeforeMiddleware(): void**

Middleware configuration setting before router execution in express app

***Usage***

```typescript
import { Application } from "@choseohwan/express-utils";
// ...

class MyApp extends Application {
    protected initBeforeMiddleware(): void {
        // add before middleware
        this.app.use(myMiddleware);
        this.app.use(myMiddleware2);
        this.app.use(myMiddleware3);
        
        // ...
    }
    
    // ...
}

export default MyApp;
```

***

> **initRouter(): void**

Router configuration for express app

***Usage***

```typescript
import { Application } from "@choseohwan/express-utils";
// ...

class MyApp extends Application {
    protected initRouter(): void {
        // add express router 
        this.app.get('/', myRouter);
        this.app.post('/post', myRouter);
        
        // ...
    }
    
    // ...
}

export default MyApp;
```

***

> **initAfterMiddleware(): void**

Middleware configuration setting after router execution in express app

***Usage***

```typescript
import { Application } from "@choseohwan/express-utils";
// ...

class MyApp extends Application {
    protected initAfterMiddleware(): void {
        // add after middleware
        this.app.use(myAfterMiddleware);
        this.app.use(myAfterMiddleware2);
        
        // ...
    }
    
    // ...
}

export default MyApp;
```

***

> getApp(): ReturnType\<typeof express>

Get express application

***Usage***

```typescript
# MyApp.ts

import { Application } from "@choseohwan/express-utils";
// ...

class MyApp extends Application {
    protected initBeforeMiddleware(): void {
        // ...
    }
    
    protected initRouter(): void {
        // ...
    }
    
    protected initAfterMiddleware(): void {
        // ...
    }
}

export default MyApp;
````

```typescript
# app.ts

import MyApp from './MyApp';

const app = new MyApp().getApp();

// 서버 시작
app.listen(8001, () => {
    console.log('test');
});
```

## RestApiRouter

Rest Api router for express

### Implementation functions

> index / show / store / update / delete (*req: Request*, *res: Response*, *next: NextFunction*);

Basic rest api method. 

| router    | http method   | route path    | desc                                  |
|:---------:|:-------------:|:--------------|:--------------------------------------|
| index     | GET           | /             | Show a list of the items in resource  |
| show      | GET           | /:id          | Show an item of resource              |
| store     | POST          | /             | Store a new item in resource          |
| update    | PATCH         | /:id          | Edit an item of resource              |
| delete    | DELETE        | /:id          | Delete an item of resource            |

***Usage***

```typescript
import { RestApiRouter } from '@choseohwan/express-utils';
import { NextFunction, Request, Response } from 'express';


class MyRouter extends RestApiRouter {
    protected index(req: Request, res: Response, next: NextFunction): void {
        res.json({
            method: 'index'
        });
        
        // ...
        
        next();
    }

    protected show(req: Request, res: Response, next: NextFunction): void {
        res.json({
            id: req.params.id
        });
        
        // ...

        next();
    }

    // ...
}

export default MyRouter;
```

***

> RestApiRouter.registerRouter(*method: HTTPMethod*, *path: string*)

Decorator to register custom express router

***Usage***

```typescript
import { RestApiRouter } from '@choseohwan/express-utils';
import { HTTPMethod } from '@choseohwan/utils/constant';
import { NextFunction, Request, Response } from 'express';

class MyRouter extends RestApiRouter {
    
    @RestApiRouter.registerRouter(HTTPMethod.PATCH, '/custom/:id')
    protected customPatch(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        // ...
        
        res.json({
            router: 'customPost'
        });

        next();
    }
    
    // ...
}

export default MyRouter;
```

***

> addMiddleware(): Handler[]

Register middleware list in express router

***Usage***

```typescript
import { RestApiRouter } from '@choseohwan/express-utils';
import { Handler } from '@choseohwan/express-utils/type';

class MyRouter extends RestApiRouter {
    protected addMiddleware(): Handler[] {
        // ...
        
        return [myMiddleware, myMiddleware2];
    }
    
    // ...
}

export default MyRouter;
```

***

> RestApiRouter.registerMiddleware

Decorator to register custom middleware

***Usage***

```typescript
import { RestApiRouter } from '@choseohwan/express-utils';
import { NextFunction, Request, Response } from 'express';

class MyRouter extends RestApiRouter {
    @RestApiRouter.registerMiddleware
    protected customMiddleware(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {
        // ...

        next();
    }
    
    // ...
}

export default MyRouter;
```

### Extension functions

> makeRouter(*routerClass: RestApiRouterConstructor*)

Make express router object


***Usage***

```typescript
import express from "express";
import { makeRouter } from "@choseohwan/express-utils";

const app = express();

app.use('/resource', makeRouter(MyRouter));

// ...
```