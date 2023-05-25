const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId });
    if (!result) {
      throw HttpError(404, `not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
