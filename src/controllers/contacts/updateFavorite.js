const { Contact } = require("../../models/contacts");
const { requestError } = require("../../helpers/requestError");

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) {
      throw requestError(404, "Not found");
    }

    if (!req.body) {
      throw requestError(400, "Missing field favorite");
    }

    res.json({
      status: "success",
      code: 200,
      data: { data: result },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
