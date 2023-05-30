const contactsAPI = require("../../models/contacts");
const { HttpError, isRequestEmpty } = require("../../helpers");

const {
  validationSchema,
  updateContactValidation,
} = require("../../schemas/validation");
const getAllContacts = async (req, res, next) => {
  try {
    const results = await contactsAPI.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getSingleContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await contactsAPI.getContactById(contactId);
    if (!results) {
      throw HttpError(404, `Contact with id: ${contactId} does not exist`);
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  const { body } = req;
  console.log("body", body);
  try {
    const { error } = validationSchema.validate(body);
    if (error) throw HttpError(400, error.message);

    const results = await contactsAPI.addContact(body);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await contactsAPI.removeContact(contactId);
    if (results === null)
      throw HttpError(404, "No such contact, nothing to delete");
    res.status(200).json("Contact deleted");
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    if (isRequestEmpty(body)) throw HttpError(400, "Missing fields");

    const { error } = updateContactValidation.validate(body);
    if (error) throw HttpError(400, error.message);

    const results = await contactsAPI.updateContact(contactId, body);
    if (results === null)
      throw HttpError(404, "No such contact, nothing to update");
    res.json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getSingleContactById,
  postContact,
  updateContactById,
  deleteContactById,
};
