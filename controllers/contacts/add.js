const { Contact, schemas } = require("../../models/contact");

const { requestError } = require("../../helpers");

const add = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw requestError(400, "Missing required name field");
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
