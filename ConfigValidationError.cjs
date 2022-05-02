module.exports = class ConfigValidationError extends Error {
  constructor(message, value, castedValue, castFunction) {
    super(message);
    this.value = value;
    this.castedValue = castedValue;
    this.castFunction = castFunction;
  }
};
