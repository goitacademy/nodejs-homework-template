export const validate = schema => {
  return async (req, res, next) => {
    try {
      req.body = await schema.validateAsync(req.body);
      next();
    } catch (error) {
      const message = error.details.map(i => i.message).join(',');
      res.status(422).json({ error: message });
    }
  };
};
