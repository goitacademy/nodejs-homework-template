module.exports = {
  validation: (schema, reqPart = "body") => {
    return (req, res, next) => {
      const validationSchema = schema.validate(req[reqPart], {
        abortEarly: false,
      });

      if (validationSchema.error) {
        const message = validationSchema.error.details
          .map(({ message }) => message)
          .join(", ");
        return res.status(400).json({
          message: `Validation error ${message}`,
        });
      }

      next();
    };
  },
};
