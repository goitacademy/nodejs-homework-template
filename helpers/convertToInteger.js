const convertToInteger = (value) => {
  const integerValue = parseInt(value, 10);

  return integerValue || integerValue > 0 ? integerValue : false;
};

module.exports = convertToInteger;
