const Joi = require("joi");
const { NotFound } = require("http-errors");

const Contact = require("../../models/contact");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateByIdFavor = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateByIdFavor;
