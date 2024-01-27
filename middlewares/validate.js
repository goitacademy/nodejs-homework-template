export const bodyValidate = (validator) => {
  return async function (req, res, next) {
    const resultValidate = validator.validate(req.body);

    if (resultValidate.error) {
      return res.status(400).json({
        message: resultValidate.error.message,
      });
    }
    return next();
  };
};
