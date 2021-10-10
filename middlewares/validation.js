const validation = schema => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
    } catch (error) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: `Error ${error.path} - ${error.errors}`,
      });
      return;
    }
    next();
  };
};

module.exports = validation;
