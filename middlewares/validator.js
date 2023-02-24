const validator = (schema) => (body) => {
  return schema.validate(body);
};

module.exports = validator;
