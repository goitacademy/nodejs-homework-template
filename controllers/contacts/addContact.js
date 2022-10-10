const { Contact } = require("../../models/contact");
const { requestError } = require("../../helpers");
const { schemas } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw requestError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
