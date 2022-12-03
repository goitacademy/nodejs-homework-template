const Joi = require('joi');

const numberPattern =
  // eslint-disable-next-line max-len
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

module.exports = {
  contactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(25).trim().required(),
      email: Joi.string().email().trim().required(),
      phone: Joi.string().pattern(numberPattern).min(10).max(13).required(),
    });

    const {error} = schema.validate(req.body);
    if (error) {
      return res.status(400).json({status: error.details});
    }
    next();
  },
};
