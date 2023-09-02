function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(
      {
        query: req.query,
        params: req.params,
        body: req.body,
      },
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: false,
      }
    );

    if (typeof error !== 'undefined') {
      return res.status(400).json({ error: error.details.map((err) => err.message).join(', ') });
    }

    req.query = value.query;
    req.params = value.params;
    req.body = value.body;

    return next();
  };
}

module.exports = validate;