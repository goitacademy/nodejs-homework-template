const validateData = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).json(error.details[0].message);
    next();
  };
};

module.exports = { validateData };
