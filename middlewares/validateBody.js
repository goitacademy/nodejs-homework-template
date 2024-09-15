export const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
      return;
    }
    next();
  };
  return func;
};

