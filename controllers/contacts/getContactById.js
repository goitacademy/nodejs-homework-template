const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);

    if (!contact) {
      throw RequestError(404);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
