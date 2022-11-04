const validationBody = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      error.status = 400
      if (error.details[0].type === "any.required") {
        error.message = `missing required ${error.details[0].path} field`
      }
      if (error.details[0].type === "object.min") {
        error.message = "missing fields"
}
      next(error);
    }
  };
};


module.exports = { validationBody };