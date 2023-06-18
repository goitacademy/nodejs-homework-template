const { Contact } = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit;
  try {
    const contacts = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email");
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
      res.status(404).json({
        message: `Contact with ID ${contactId} not found`,
      });
      return;
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone, favorite } = req.body;
    const { _id: owner } = req.user;
    const contact = await Contact.create({
      name,
      email,
      phone,
      favorite,
      owner,
    });

    res.status(201).send(contact);
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
      res.status(404).json({
        message: `Contact with ID ${contactId} not found`,
      });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      res.status(404).json({
        message: `Contact with ID ${contactId} not found`,
      });
      return;
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
};
