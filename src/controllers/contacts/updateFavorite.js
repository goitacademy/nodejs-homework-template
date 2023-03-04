const { Contact } = require("../../models/contacts");
const createError = require('http-errors');

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
      throw createError(400, "Missing field favorite");
    }

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) {
      throw createError(404, "Not found");
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

module.exports = updateFavorite;
