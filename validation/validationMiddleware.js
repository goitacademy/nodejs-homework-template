exports.validate = (schema) => (req, res, next) => {
  const {
    error
  } = schema.validate(req.body);
  if (error) {
    res.status(422)
      .send(error.details[0].message);
  } else {
    next();
  }
};