const contacts = require("../../models/contacts");
const { RequestError } = require("../../utils");

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
