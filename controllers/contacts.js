// const Joi = require("joi");

const contactSchema = require("../models/contacts");
const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", contactSchema);

// const contactAddSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email(),
//   phone: Joi.string()
//     .regex(/^\d{3}-\d{2}-\d{2}$/)
//     .required(),
// });

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await Contact.find(owner);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      res
        .status(404)
        .json({ message: `Contact with ID ${contactId} not found` });
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

  const addContact = async (req, res, next) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner });

    res.status(201).json(result);
}
// const addContact = async (req, res, next) => {
//   // const newContact = contactAddSchema.validate(req.body);
//   try {
//     const { value } = await contactAddSchema.validateAsync(req.body);
//     const savedContact = await Contact.create(value);
//     // const { name, email, phone, favorite } = req.body;
//     // const contact = new Contact({ name, email, phone, favorite });
//     res.status(201).json(savedContact);
//   } catch (error) {
//     next(error);
//   }
// };

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      res
        .status(404)
        .json({ message: `Contact with ID ${contactId} not found` });
      return;
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone, favorite } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, email, phone, favorite },
      { new: true }
    );
    if (!updatedContact) {
      res
        .status(404)
        .json({ message: `Contact with ID ${contactId} not found` });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
};
