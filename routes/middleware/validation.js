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
    if (Object.keys(value.body).length === 0) {
    return  res.status(400).json({ message: "missing fields" });
    }
    if (error) {
      const errorField = error.details[0];
      const errorType = error.details[0].type;

      if (errorType === "any.required") {
       return res.status(400).json({
          message: `missing required ${errorField.path[1]} field`,
        });
      }
    }

    req.query = value.query;
    req.params = value.params;
    req.body = value.body;

    return next();
  };
}
module.exports = validate;
