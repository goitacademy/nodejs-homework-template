const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res, next) => {
  try {
    const result = await Contact.findByIdAndRemove(req.params.contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
