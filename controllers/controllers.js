const {
  Contact,
  addValidate,
  updateValidate,
  updateFavorite,
} = require("../models/contact");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (e) {
    res.status(204).json({ message: "No contacts" });
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      throw new Error();
    }
    res.status(200).json(contact);
  } catch (e) {
    res.status(404).json({ message: "Not found" });
    next(e);
  }
};

const addNewContact = async (req, res, next) => {
  const { error } = addValidate.validate(req.body);

  try {
    if (error) {
      throw new Error(error.message);
    }
    const contact = await Contact.create(req.body);
    if (!contact) {
      throw new Error("Contact with this name has already been in contacts");
    }
    res.status(201).json({ contact: contact });
  } catch (e) {
    res.status(400).json({ message: e.message });
    next(e);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId);
    if (!contact) {
      throw new Error();
    }
    res.status(200).json({ message: "contact deleted" });
  } catch {
    res.status(404).json({ message: "Not found" });
    next();
  }
};

const updateContact = async (req, res, next) => {
  const { error, value } = updateValidate.validate(req.body);
  try {
    if (error || Object.keys(value).length === 0) {
      const message = error ? error.message : "missing fields";
      res.status(400).json(message);
      return;
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (contact === null) {
      throw new Error("Not found");
    }
    res.json(contact);
  } catch (e) {
    res.status(404).json({ message: e.message });
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavorite.validate(req.body);
  try {
    if (error) {
      const message = error ? error.message : "missing field";
      res.status(400).json(message);
      return;
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { favorite: req.body.favorite },
      { new: true }
    );
    if (contact === null) {
      throw new Error("Not found");
    }
    res.json(contact);
  } catch (e) {
    res.status(404).json({ message: e.message });
    next(e);
  }
};

module.exports = {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
