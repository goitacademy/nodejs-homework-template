const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const Joi = require("joi");

class ContactControllers {
  async getAllContacts(req, res) {
    const contacts = await listContacts();
    return res.status(200).json(contacts).send();
  }

  async getContact(req, res) {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(contact).send();
  }

  async removeContactById(req, res, next) {
    removeContact(req.params.contactId);
    return res.status(200).json({ message: "contact deleted" }).send();
  }

  async addNewContact(req, res, next) {
    addContact(req.body);
    return res.status(201).send({ message: "contact added" });
  }

  async validateAddContact(req, res, next) {
    const validationSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });

    const contactData = req.body;
    const result = validationSchema.validate(contactData);

    if (result?.error) {
      return res
        .status(400)
        .json({
          message: result.error.details[0].message,
        })
        .send();
    }

    next();
  }

  async updateContactById(req, res, next) {
    updateContact(req.params.contactId, req.body);
    return res.status(200).json({ message: "contact updated" }).send();
  }

  async validateUpdateContactById(req, res, next) {
    const validationSchema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
    });

    const contactData = req.body;
    const result = validationSchema.validate(contactData);

    if (result?.error) {
      return res.status(400).json({ message: "missing fields" }).send();
    }

    next();
  }
}

const contactControllers = new ContactControllers();

module.exports = contactControllers;
