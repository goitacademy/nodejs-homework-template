exports.validate = (schema, isUpdate = false, reqPart = "body") => {
  return (req, res, next) => {
    const validationResult = schema.validate(req[reqPart], {
      stripUnknown: true,
    });
    if (validationResult.error) {
      return res.status(400).send({
        message: isUpdate ? "missing fields" : "missing required name field",
      });
    }
    req.body = validationResult.value;

    next();
  };
};
