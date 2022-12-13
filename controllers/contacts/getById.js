const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const result = await Contact.findById(req.params.contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
