const { Contact } = require("../../models");
const { favoriteJoiSchema } = require("../../models/contact");
const createError = require("http-errors");

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing field favorite";
      throw error;
    }
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw createError(404, `Contact with ID: ${id} not found`);
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

module.exports = updateFavorite;