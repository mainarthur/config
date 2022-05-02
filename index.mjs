export const defaultOptions = Object.freeze({
  autocast: true,
  validate: () => true,
});

export const defaultCast = (value) => value;

export const autocastFunction = (value) => {
  if (typeof value !== "string") return value;

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
  const validate = options.validate ?? defaultOptions.validate;
  const autocast = options.autocast ?? defaultOptions.autocast;

  const value = process.env[path] ?? defaultValue;
  const castFunction = cast ?? (autocast ? autocastFunction : defaultCast);
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

export function config(params, defaultValue, cast, validate, autocast) {
  if (typeof params === "string")
    return rawConfig({ path: params, defaultValue, cast, validate, autocast });
  return rawConfig(params);
}

export class ConfigValidationError extends Error {
  constructor(message, value, castedValue, castFunction) {
    super(message);
    this.value = value;
    this.castedValue = castedValue;
    this.castFunction = castFunction;
  }
}
