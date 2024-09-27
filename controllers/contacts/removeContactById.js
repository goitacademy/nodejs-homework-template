const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const removeContactById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await contacts.removeContact(id);
    if (!result) {
      throw RequestError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = removeContactById;
