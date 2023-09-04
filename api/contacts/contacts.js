const { cntrlWrappers } = require("../../helpers");
const { Contact } = require("../../models/contact");

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
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  const { _id: owner } = req.user;

  const filterConditions = { owner };

  if (favorite !== null) {
    filterConditions.favorite = favorite;
  }

  const contacts = await Contact.find(filterConditions).skip(skip).limit(limit);

  if (contacts.length === 0) {
    return res.status(200).json({ message: "Сontacts are missing" });
  }

  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;

  const conntactsById = await Contact.findById(id);

  const owner = req.user._id; // Ід власника беремо з авторизованого користувача

  if (!conntactsById) {
    return res.status(404).json({ message: "Not found" });
  }

  if (owner !== conntactsById.owner) {
    return res.status(403).json({ message: "Limited access" });
  }

  res.send(conntactsById);
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;

  const owner = req.user._id; // Ід власника беремо з авторизованого користувача

  const deleteContact = await Contact.findByIdAndRemove(id);

  if (!deleteContact) {
    res.status(404).json({ message: "Not found" });
  }

  if (owner !== deleteContact.owner) {
    return res.status(403).json({ message: "Limited access" });
  }

  res.status(200).json({ message: "Contact deleted" });
};

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { error } = addSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  const { error } = putSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const owner = req.user._id; // Ід власника беремо з авторизованого користувача

  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedContact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  if (owner !== updatedContact.owner) {
    return res.status(403).json({ message: "Limited access" });
  }

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  const owner = req.user._id; // Ід власника беремо з авторизованого користувача

  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  if (owner !== updatedContact.owner) {
    return res.status(403).json({ message: "Limited access" });
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  updateStatusContact: cntrlWrappers(updateStatusContact),
  updateContact: cntrlWrappers(updateContact),
  listContacts: cntrlWrappers(listContacts),
  getContactById: cntrlWrappers(getContactById),
  removeContact: cntrlWrappers(removeContact),
  addContact: cntrlWrappers(addContact),
};
