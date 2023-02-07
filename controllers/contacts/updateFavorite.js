const contactModel = require('../../models/contact');
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const requestBodySchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateFavorite = async (req, res) => {
  const { error } = requestBodySchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await contactModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = updateFavorite;
