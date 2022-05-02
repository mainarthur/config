# @masterarthur/config

Lightweight zero-dependecy Javascript library for easy configuration for nodejs apps

## Instalation

```bash
npm i @masterarthur/config
```

## Usage examples

```js
import { config } from "@masterarthur/config";
import mongoose from "mongoose";

const connectionString = config("MONGODB_URL");

await mongoose.connect(connectionString);
```

```js
import { makeConfig } from "@masterarthur/config";
import express from "express";

const config = await makeConfig(".env");
const app = express();
// process.env.APP_PORT = "3000"
const port = config("APP_PORT"); // 3000

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

Also you can use require

```js
const { config } = require("@masterarthur/config");
const data = config({
  path: "PAYLOAD",
  defaultValue: "{}",
  cast: JSON.parse,
  validate: (value) => !Array.isArray(value),
  autocast: false,
});
```

By default `config` function uses `process.env` to get data and you are able to use it two ways:

- Inline

  ```ts
  function config<T>(
    path: string,
    defaultValue?: string,
    cast?: (value: string) => T,
    validate?: ValidateFunction,
    autocast?: boolean
  ): T;
  ```

- Using object to pass arguments in any order

  ```ts
  function config<T>(params: {
    path: string;
    defaultValue?: string;
    cast?: (value: string) => T;
    validate?: ValidateFunction;
    autocast?: boolean;
  }): T;
  ```

### Arguments

| Param        | Type       | Description                                                                                                                |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| path         | `string`   | key of value                                                                                                               |
| defaultValue | `string`   | default value env variable                                                                                                 |
| cast         | `Function` | function that casts string value of env variable to type we need                                                           |
| validate     | `Function` | Function that validates casted value and if it returns false config function will throw error                              |
| autocast     | `boolean`  | by default true, if it's true config function will automaticly cast value of env variable to number/boolean/null/undefined |

### makeConfig arguments

| Param    | Type                          | Description                                                                                                   |
| -------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------- |
| filename | `PathLike`                    | Path to configuration file                                                                                    |
| parser   | `Function` or `AsyncFunction` | by default parses .env and .json files, in case you need parse custom file type you need pass your own parser |
