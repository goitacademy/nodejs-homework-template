const contacts = require("../../models/contacts");
const requestError = require("../../helpers/requestError");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resolve = await contacts.getContactById(contactId);

    if (!resolve) {
      throw requestError(400);
    }
    return res.status(200).json(resolve);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
