const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
    });
  } else {
    next();
  }
};

module.exports = validate;
