const validate = addSchema => {
  return (req, res, next) => {
    const { error } = addSchema.validate(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log('error 400! missing fields');
      throw res.status(400).json({ message: 'missing fields' });
    }

    if (error) {
      error.status = 400;
      error.message = `Missing required ${error.details[0].context.label} field`;
      console.log(`error 400!`, error.message);
      next(error);
    } else {
      next();
    }
  };
};

const validateFavorite = updateFavoriteSchema => {
  return (req, res, next) => {
    const { error } = updateFavoriteSchema.validate(req.body);

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      throw res.status(400).json({ message: 'missing field favorite' });
    }
    if (error) {
      error.status = 400;
      error.message = `Missing required ${error.details[0].context.label} field`;
      console.log(`error 400!`, error.message);
      next(error);
    } else {
      next();
    }
  };
};

const validateAuth = validateAuth => {
  return (req, res, next) => {
    const { error } = validateAuth.validate(req.body);

    if (error) {
      error.status = 400;
      error.message;
      console.log(`err 400!`, error.message);
      next(error);
    } else {
      next();
    }
  };
};

module.exports = {
  validate,
  validateFavorite,
  validateAuth,
};
