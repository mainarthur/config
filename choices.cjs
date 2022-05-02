module.exports = function choices(...variants) {
  return (value) => variants.includes(value);
};
