const validateSub = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: `missing field subscription` });
      return;
    }
    if (error) {
      res.status(400).json({ message: `Bad Request` });
      return;
    }
    next();
  };

  return func;
};
