const Joi = require("joi");

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const { Contact } = require("../../models");

const updateContact = async (req, res, next) => {
  try {
    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) {
      const error = new Error(`contact with id=${contactId} Not Found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
