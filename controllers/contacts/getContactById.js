const { NotFound } = require("http-errors");
const contacts = require("../../models/contacts");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw new NotFound(`Not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
