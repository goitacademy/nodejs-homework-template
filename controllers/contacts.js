const service = require("../service");
const Joi = require("joi");

const schemaAdd = Joi.object({
      name: Joi.string().alphanum().min(1).max(44).regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().alphanum().min(8).max(16).required(),
      });
const schemaUpdate = Joi.object({
      name: Joi.string().alphanum().min(1).max(44).regex(/^\s*\w+(?:[^\w,]+\w+)*[^,\w]*$/),
      email: Joi.string().email({ minDomainSegments: 2 }),
      phone: Joi.string().alphanum().min(8).max(16),
      favorite: Joi.bool(),
      });
const schemaFavorite = Joi.object({
        favorite: Joi.bool().required(),
        });

const getListContacts = async (req, res, next) => {
try {
  const owner = req.user._id;
  const contacts = await service.listContacts(owner);
  res.status(200).json(contacts);
} catch (error) {
  next(error);
}
};

const getThisContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await service.getContactById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  const body = schemaAdd.validate(req.body);
  const { name, email, phone } = body.value;
  if (body.error) {
    return res.status(400).json({ message: `Field ${body.error.message}`});
  }
  try {
    
    const owner = req.user._id;
    const newContact = {name, email, phone, owner};
    await service.addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

const removeThisContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const deleted = await service.removeContact(id);
    if (!deleted) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateThisContact = async (req, res, next) => {
  const id = req.params.contactId;
  const body = schemaUpdate.validate(req.body);
  const { name, email, phone, } = req.body;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  if (body.error) {
    return res.status(400).json({ message: `Field ${body.error.message}` });
  }
  try {
    const updatedContact = await service.updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const id = req.params.contactId;
  const body = schemaFavorite.validate(req.body);
  if (body.error) {
    return res.status(400).json({ message: `Field ${body.error.message}` });
  }
  try {
    const updatedContact = await service.updateContact(id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContacts,
  getThisContactById,
  removeThisContact,
  addNewContact,
  updateThisContact,
  updateStatusContact,
};