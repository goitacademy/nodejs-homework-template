const Joi = require('joi');
const contactsServices = require('../services/contacts');

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().pattern(
    /^\+?(\d{10,12}|(38|)(\s?(\(\d{3}\)\s?|\d{3}\s)(\d{7}|\d{3}(\s|-)\d{2}(\s|-)?\d{2})))$/
  ),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactsServices.getAll(req.query);
    res.json(contacts);
  } catch (error) {
    console.error(error);
    next();
  }
};

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsServices.getById(id);
    if (contact === null) {
      return res.status('404').json(`Contact with id "${id}" not found.`);
    }
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const addContact = async (req, res, next) => {
  try {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send({ message: 'missing required name field' });
    }

    const newContact = await contactsServices.addContact(req.body);
    res.json(newContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deletedContact = await contactsServices.deleteContactById(id);
    if (deletedContact === null) {
      return res
        .status('404')
        .json({ message: `Contact with id "${id}" not found.` });
    }
    res.json(deletedContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const updatedContact = await contactsServices.updateContactById(
      id,
      req.body
    );
    if (updatedContact === null) {
      return res
        .status('404')
        .json({ message: `Contact with id "${id}" not found.` });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { favorite } = req.body;
    if (!favorite) {
      return res.status('400').json({ message: 'missing field favorite' });
    }
    const updatedContact = await contactsServices.updateContactById(id, {
      favorite,
    });

    if (updatedContact === null) {
      return res
        .status('404')
        .json({ message: `Contact with id "${id}" not found.` });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
  updateStatusContact,
};
