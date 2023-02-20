const { Contact } = require("../models");

const {
  contactPostValidator,
  contactPutValidator,
  favoriteJoiSchema,
} = require("../schemasJoi");

const listContacts = async (req, res) => {
  const result = await Contact.find({});
  return res.status(200).json(result);
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);

    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    next(err);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactPostValidator(req.body);
    if (error)
      return res.status(400).json({ message: "missing required name field" });
    const { name, email, phone, favorite } = req.body;
    const contact = await Contact.create({ name, email, phone, favorite });
    if (contact) return res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactPutValidator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { name, email, phone, favorite } = req.body;
    const { contactId } = req.params;
    if (!name && !email && !phone && !favorite) {
      res.status(400).json({ message: "missing fields" });
    }
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactToRemove = await Contact.findByIdAndRemove(contactId);
    if (!contactToRemove) {
      res.status(404).json({ message: "Not found contact" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = favoriteJoiSchema(req.body);

    if (error) {
      res.status(400).json({ message: "missing field favorite" });
    }
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );
    if (!result) {
      return res.status(404).json({ message: "Not found contact" });
    }
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listContacts,
  addContact,
  getById,
  updateContact,
  removeContact,
  updateStatusContact,
};
