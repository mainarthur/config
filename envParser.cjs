const LINE =
  /(?:^|^)\s*(?:export\s+)?(?<key>[\w.-]+)(?:\s*=\s*?|:\s+?)(?<value>\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

/**
 *
 * @param {Buffer} content
 * @returns
 */
module.exports = function envParser(content) {
  const result = {};

  const lines = content.toString().replace(/\r\n?/gm, "\n");

  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match.groups.key;
    let value = (match.groups.value || "").trim();
    const firstLatter = value.at(0);

    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");

    if (firstLatter === '"') {
      value = value.replace(/\\n/g, "\n");
      value = value.replace(/\\r/g, "\r");
    }

    result[key] = value;
  }

  return result;
};
