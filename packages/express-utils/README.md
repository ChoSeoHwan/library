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

> getApp(): ReturnType<typeof express>

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

