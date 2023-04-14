const service = require("../service");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(8).max(99).required(),
});

const favoriteSchema = Joi.object().keys({
  favorite: Joi.boolean().required(),
});

const get = async (req, res, next) => {
  try {
    const contacts = await service.getContacts();
    res.json({ message: "Success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const contact = await service.addContact(name, email, phone);
    res.status(201).json({ message: "Created", code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.removeContact(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Deleted", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const contact = await service.updateContact(contactId, {
      name,
      email,
      phone,
    });
    res.json({ message: "Updated", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const { error } = favoriteSchema.validate({ favorite });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const contact = await service.updateContact(contactId, { favorite });
    res.json({ message: "Updated", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
