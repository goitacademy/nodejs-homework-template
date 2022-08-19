const { basedir } = global;

const {createError} = require(`${basedir}/helpers`);

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, "missing required field");
    }
    next();
  };
};

module.exports = validation;
