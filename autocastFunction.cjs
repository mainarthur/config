module.exports = function autocastFunction(value) {
  if (typeof value !== "string") return value;

  const lowercaseValue = value.trim().toLowerCase();

  if (lowercaseValue === "true") return true;
  if (lowercaseValue === "false") return false;

  if (lowercaseValue === "null") return null;
  if (lowercaseValue === "undefined") return undefined;

  const numberValue = Number(lowercaseValue);
  if (!Number.isNaN(numberValue) && value !== "") return numberValue;

  return value;
};
