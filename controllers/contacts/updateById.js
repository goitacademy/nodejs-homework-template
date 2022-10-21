const { Contact, schemas } = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const { isValidObjectId } = require("mongoose");

const updateById = async (req, res, next) => {
  try {
    const { error } = schemas.contactsAddSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing fields");
    }

    const id = req.params.contactId;

    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw RequestError(404, `${id} is not valid id`);
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
