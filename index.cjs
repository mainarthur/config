module.exports = {};

module.exports.defaultOptions = Object.freeze({
  autocast: true,
  validate: () => true,
});

module.exports.defaultCast = (value) => value;

module.exports.autocastFunction = (value) => {
  const lowercaseValue = value.trim().toLowerCase();

  if (lowercaseValue === "true") return true;
  if (lowercaseValue === "false") return false;

  if (lowercaseValue === "null") return null;
  if (lowercaseValue === "undefined") return undefined;

  const numberValue = parseFloat(lowercaseValue);
  if (!Number.isNaN(numberValue)) return numberValue;

  return value;
};

function rawConfig(options) {
  const path = options.path;
  const defaultValue = options.defaultValue;
  const cast = options.cast;
  const validate = options.validate ?? module.exports.defaultOptions.validate;
  const autocast = options.autocast ?? module.exports.defaultOptions.autocast;

  const value = process.env[path] ?? defaultValue;
  const castFunction =
    cast ??
    (autocast ? module.exports.autocastFunction : module.exports.defaultCast);
  const castedValue = castFunction(value);
  if (!validate(castedValue))
    throw new module.exports.ConfigValidationError(
      `Ivalid value for "${path}", got ${value}`,
      value,
      castedValue,
      castFunction
    );
  return castedValue;
}

module.exports.config = function config(
  params,
  defaultValue,
  cast,
  validate,
  autocast
) {
  if (typeof params === "string")
    return rawConfig({ path: params, defaultValue, cast, validate, autocast });
  return rawConfig(params);
};

module.exports.ConfigValidationError = class ConfigValidationError extends (
  Error
) {
  constructor(message, value, castedValue, castFunction) {
    super(message);
    this.value = value;
    this.castedValue = castedValue;
    this.castFunction = castFunction;
  }
};
