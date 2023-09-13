const Contact = require("../models/contact");

const schema = require("../schemes/contacts");

const list = async (req, res, next) => {
  try {
    const list = await Contact.find();

    res.json(list);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = schema.addContact.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = schema.updateContact.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = schema.updateFavorite.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const status = await Contact.findOneAndRemove({
      _id: req.params.contactId,
    });
    if (!status) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
  getById,
  add,
  update,
  updateFavorite,
  remove,
};
