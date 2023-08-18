const Joi = require("joi");
const { HttpError } = require("../helpers");
const {
  getAllContacts,
  getById,
  createContact,
  deleteContact,
  changeContact,
} = require("./requests.js");



const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});


const listContacts = async (req, res, next) => {
  try {
    const allContacts = await getAllContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const contact = await getById(id);
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      const missingFieldName = error.details[0].path.toString();

      throw HttpError(400, `missing required ${missingFieldName} field`);
    }
    const contactToCreate = await createContact(req.body);
    res.status(201).json(contactToCreate);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactToRemove = await deleteContact(id);

    if (!contactToRemove) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Contact removed successfully" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    const emptyBody = Object.keys(req.body);
    if (!emptyBody.length) {
      throw HttpError(400, `missing fields`);
    }
    if (error) {
      throw HttpError(
        400,
        `missing required ${error.details[0].path.toString()} field`
      );
    }

    const { id } = req.params;
    const updatedContact = await changeContact(id, req.body);

    if (!updatedContact) {
      throw HttpError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
