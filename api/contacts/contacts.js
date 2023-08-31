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
  const contacts = await Contact.find();
  res.json(contacts);
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;

  const conntactsById = await Contact.findById(id);

  if (!conntactsById) {
    res.status(404).json({ message: "Not found" });
  }
  res.send(conntactsById);
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;

  const deleteContact = await Contact.findByIdAndRemove(id);
  if (!deleteContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res, next) => {
  const { error } = putSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedContact === null) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);
  console.log("Example", req.body);
  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  const id = req.params.contactId;
  const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (updatedContact === null) {
    res.status(404).json({ message: "Not found" });
    return;
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
