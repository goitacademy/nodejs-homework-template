const contacts = require("../../models/contacts");

const { requestError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneContact = await contacts.getContactById(id);
    if (!oneContact) {
      throw requestError(404, "Not found");
    }

    res.json(oneContact);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;