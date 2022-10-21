const { Contact, schemas } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const add = async (req, res, next) => {
  try {
    const { error } = schemas.contactsAddSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing required name field");
    }

    const userId = req.user._id;
    const newContact = {
      ...req.body,
      owner: userId,
    };

    const result = await Contact.create(newContact);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
