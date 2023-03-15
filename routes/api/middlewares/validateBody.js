

const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
    return res.status(400).json({ message: "произошла беда" });
    }
    next();
  };
};

module.exports = validateBody;
