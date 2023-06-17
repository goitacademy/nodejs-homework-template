const { Contacts } = require("../models/contacts");
const {
  newContactValidator,
  isFavoriteValidator,
} = require("../validators/validators");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json({ message: contacts });
  } catch (error) {
    console.error("An error occurred");
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const foundContact = await Contacts.findOne({ _id: contactId });

    if (foundContact) {
      res.status(200).json(foundContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const response = await Contacts.findByIdAndDelete({ _id: contactId });
    if (response) {
      res.json({ message: `Contact ${response.name} deleted` });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = await newContactValidator(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone, favorite } = req.body;
    const newContact = new Contacts({
      name: name,
      email: email,
      phone: phone,
      favorite: favorite,
      owner: req.user._id,
    });
    newContact.save();
    res.status(201).json({ message: newContact });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { error } = await newContactValidator(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const { contactId } = req.params;
    const { body } = req;
    await Contacts.findByIdAndUpdate({ _id: contactId }, body, {
      new: true,
    });
    res.status(200).json({ message: "Contact Updated" });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = await isFavoriteValidator(req.body);
    if (error) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    const { contactId } = req.params;
    const { favorite = false } = req.body;

    await Contacts.findByIdAndUpdate({ _id: contactId }, favorite);
    res.status(200).json({ message: `Contact updated` });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
    next(error);
  }
};

module.exports = {
  updateStatusContact,
  updateContact,
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
