const validateRequestBody = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(res.status(400).json({ message: 'Bad Request' }));
      }
  
      return next();
    };
  };
  
  module.exports = {
    validateRequestBody,
  };