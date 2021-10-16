# `@choseohwan/eslint-config-base`

javascript/typescript utility functions for @choseohwan project

## Install

### npm
```shell
npm install @choseohwan/utils
```

### yarn
```shell
yarn add @choseohwan/utils
```

## API Definitions

### Utility Functions

#### delay

Delay `microsecond` time

***Syntax***
> delay(*time*)


***Parameters***

`time`
 - **TYPE :** number
 - **REQUIRED :** Y
 - **DEFAULT :** *X*
 - **DESC :** time to delay (microseconds)

***Return***

- **TYPE :** Promise

***Usage***

```typescript
import { delay } from '@choseohwan/utils';

console.log('One');

// 1 second delay
await delay(1000);

console.log('Two');

/* RESULT
One
// 1 second delay
Two
 */
```

***

## Prototype Utilities

### Number.prototype

#### Number.prototype.addSeparator

Add separator(,) to number.

***Syntax***
> *numObj*.addSeparator()


***Parameters***

*No Parameters.*

***Return***

- **TYPE :** string
- **DESC :** Number with seperator(,) added for every thousand.

***Usage***

```typescript
import '@choseohwan/utils/prototypes';

const number = 123456789;
console.log(`number: ${number.addSeparator()}`);

const float = 1234567891011.1213;
console.log(`float: ${float.addSeparator()}`);

const nagative = -123456789;
console.log(`nagative: ${nagative.addSeparator()}`);

/* RESULT
number: 123,456,789
float: 1,234,567,891,011.1213
nagative: -123,456,789
 */
```

***

#### Number.prototype.addSeparator

Add separator(,) to number.

***Syntax***
> *numObj*.convertKorean()

***Parameters***

*No Parameters.*

***Return***

- **TYPE :** string
- **DESC :** Numbers changed to Korean units.

***Usage***

```typescript
import '@choseohwan/utils/prototypes';

const number = 123456;
console.log(`number: ${number.convertKorean()}`);

const float = 12345678910.1213;
console.log(`float: ${float.convertKorean()}`);

const nagative = -12345678910111;
console.log(`nagative: ${nagative.convertKorean()}`);

/* RESULT
number: 12.3만
float: 123.4억
nagative: -12.3조
 */
```

***

## Constants

### HTTP

#### HTTPMethod

Http Method List

***Syntax***
> Method.{*GET | POST | PUT | DELETE | ...*}

***Usage***

```typescript
import { HTTPMethod } from '@choseohwan/utils/constant';

console.log(`Method : ${HTTPMethod.GET}, ${HTTPMethod.POST}, ...`);

/* RESULT
Method : GET, POST, ...
 */
```

***