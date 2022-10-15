const validation = schema => {
  return (req, res, next) => {
    // console.log('res-in-validation:', res);

    console.log('req', req.body);

    const { error } = schema.validate(req.body);
    console.log('error-validation:', error);
    if (error) {
      error.status = 400;
      error.message = 'missing required name field';
      next(error);

      return;
    }

    next();
  };
};

module.exports = validation;
