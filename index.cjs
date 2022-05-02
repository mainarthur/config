const { readFile } = require("fs/promises");
const path = require("path");
const autocastFunction = require("./autocastFunction.cjs");
const choices = require("./choices.cjs");
const ConfigValidationError = require("./ConfigValidationError.cjs");
const envParser = require("./envParser.cjs");
const jsonParser = require("./jsonParser.cjs");

const AsyncFunction = (async () => {}).constructor;
const defaultValidate = () => true;
const defaultAutocast = true;
const parsers = {
  ".json": jsonParser,
  ".env": envParser,
};

/**
 * @param {T} value
 * @template T
 * @returns {T}
 */
const defaultCast = (value) => value;

function rawConfig(options, env) {
  const path = options.path;
  const defaultValue = options.defaultValue;
  const autocast = options.autocast ?? defaultAutocast;
  const castFunction =
    options.cast ?? (autocast ? autocastFunction : defaultCast);
  const validate = options.validate ?? defaultValidate;

  const value = env[path] ?? defaultValue;

  const castedValue = castFunction(value);
  if (!validate(castedValue))
    throw new ConfigValidationError(
      `Ivalid value for "${path}", got ${value}`,
      value,
      castedValue,
      castFunction
    );
  return castedValue;
}

function config(env) {
  return (params, defaultValue, cast, validate, autocast) => {
    if (typeof params === "string")
      return rawConfig(
        { path: params, defaultValue, cast, validate, autocast },
        env
      );
    return rawConfig(params, env);
  };
}

/**
 *
 * @param {import("fs").PathLike} filename
 * @returns {(content: Buffer) => Record<string, string> | Promise<Record<string, string>>}
 */
function getFileParser(filename) {
  const extension = path.extname(filename.toString()).toLowerCase();
  const parser = parsers[extension];
  if (!parser)
    throw new RangeError(
      `Parser for "${extension}" is not defined. Please, pass your custom parser for it`
    );
  return parser;
}

/**
 *
 * @param {import('fs').PathLike} filename
 * @param {(content: Buffer) => Record<string, string> | Promise<Record<string, string>>} [parser]
 */
async function makeConfig(filename, parser) {
  const fileContent = await readFile(filename);
  const fileParser = parser ?? getFileParser(filename);

  const result = await (fileParser instanceof AsyncFunction
    ? fileParser(fileContent)
    : Promise.resolve(fileParser(fileContent)));

  const env = { ...process.env, ...result };

  return config(env);
}

module.exports = {
  ConfigValidationError,
  config: config(process.env),
  choices,
  makeConfig,
};
