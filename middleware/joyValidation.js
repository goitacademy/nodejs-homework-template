const joyValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      error.status = 400;
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.details.map((x) => x.message),
      });
    }
    next();
  };
};

module.exports = joyValidation;
