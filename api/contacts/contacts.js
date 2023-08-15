// const updateFavoriteSchema = require("../../models");

const { Contact } = require("../../models");

const Joi = require("joi");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const putSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
}).or("name", "phone", "email");

const listContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch {
    console.log("error");
    res.status(500).json({ message: "Server error" });
  }
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const conntactsById = await Contact.findById(id);

    if (!conntactsById) {
      res.status(404).json({ message: "Not found" });
    }
    res.send(conntactsById);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const deleteContact = await Contact.findByIdAndRemove(id);
    if (!deleteContact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const updateContact = async (req, res, next) => {
  const { error } = putSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  try {
    const id = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedContact === null) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(updatedContact);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  console.log("Example", req.body);
  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  try {
    const id = req.params.contactId;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedContact === null) {
      res.status(404).json({ message: "Not found" });
      return
    }
    res.status(200).json(updatedContact);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  updateStatusContact,
  updateContact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
