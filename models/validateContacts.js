const validateContact = (schema) => {
  return (body) => {
    const { error } = schema.validate(body);
    if (error) {
      throw new Error("Validation error: " + error.details[0].message);
    }
    return body;
  };
};

module.exports = { validateContact };
