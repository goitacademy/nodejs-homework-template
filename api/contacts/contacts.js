const { cntrlWrappers, HttpError } = require("../../helpers");
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

const addContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { error } = addSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  const newContact = await Contact.create({
    ...req.body,
    owner,
  });
  res.status(201).json(newContact);
};

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
  const owner = req.user._id;

  await Contact.findOne({ _id: id, owner })
    .then((user) => {
      if (user) {
        return res.json(user);
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    })
};

const updateContact = async (req, res, next) => {
  const { error } = putSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const id = req.params.contactId;
  const { _id: owner } = req.user;

  await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true })
    .then((updatedContact) => {
      if (updatedContact) {
        return res.status(200).json(updatedContact);
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    })
    .catch((err) => {
      HttpError(err.status, `${err.message}`);
    });
};

const updateStatusContact = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    const emptyRequired = error.details[0].path;
    res.status(400).json({ message: `missing required ${emptyRequired}` });
    return;
  }

  const id = req.params.contactId;
  const { _id: owner } = req.user;

  await Contact.findOneAndUpdate({ _id: id, owner }, req.body, { new: true })
    .then((updatedContact) => {
      if (updatedContact) {
        return res.status(200).json(updatedContact);
      } else {
        res.status(404).json({ message: "Contact not found" });
      }
    })
    .catch((err) => {
      HttpError(err.status, `${err.message}`);
    });
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  const owner = req.user._id;

  await Contact.findByIdAndRemove({ _id: id, owner }).then((user) => {
    if (user) {
      return res.status(200).json({ user, message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  });
};

module.exports = {
  updateStatusContact: cntrlWrappers(updateStatusContact),
  updateContact: cntrlWrappers(updateContact),
  listContacts: cntrlWrappers(listContacts),
  getContactById: cntrlWrappers(getContactById),
  removeContact: cntrlWrappers(removeContact),
  addContact: cntrlWrappers(addContact),
};
