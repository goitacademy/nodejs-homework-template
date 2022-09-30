const contactsOperations = require("../../models/contacts");
const RequestError = require("../../helpers/requestError");
const conctactShchema = require("../../shchemas/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = conctactShchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const contacts = await contactsOperations.addContact(req.body);
    res.status(201).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
