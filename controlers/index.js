const Joi = require("joi");

const {
  fetchContacts,
  fetchContact,
  insertContact,
  updadeContact,
  removeContact,
  updateStatusContact,
} = require("./services");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contacts = await fetchContacts(userId);
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const contact = await fetchContact(userId, req.params.id);
    if (contact) {
      res.json(contact);
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const userId = req.user._id;
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const result = await insertContact(userId, {
      name,
      email,
      phone,
      favorite,
    });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }
    const result = await updadeContact(userId, { id, toUpdate: req.body });
    if (!result) {
      next();
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    await removeContact(userId, id);
    res.status(204).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const patchContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const userId = req.user._id;
  try {
    if (!favorite) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    const result = await updateStatusContact(userId, { id, favorite });
    if (!result) {
      next();
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  putContact,
  deleteContact,
  patchContact,
};