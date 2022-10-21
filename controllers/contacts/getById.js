const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw RequestError(404, `${id} is not valid id`);
    }

    const result = await Contact.findById(id);

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
