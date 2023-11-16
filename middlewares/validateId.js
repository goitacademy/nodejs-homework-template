const Joi = require('joi');

const validateId = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().length(24).hex().required(),
  });

  const { error } = schema.validate({ id: req.params.id });

  if (error) {
    return res.status(404).json({ message: 'Not found' });
  }

  next();
};



module.exports = validateId;
