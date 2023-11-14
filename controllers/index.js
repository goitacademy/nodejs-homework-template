import {
  createContact,
  getAllContacts,
  getContactById,
  removeContact,
  updateContact,
} from "#services/index.js";
import Joi from "joi";

const contactBodySchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email({ maxDomainSegments: 2 }).required(),
  phone: Joi.string().min(9).max(20).required(),
});

const favoriteBodySchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const get = async (req, res, next) => {
  try {
    const results = await getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { value, error } = contactBodySchema.validate(req.body);
  const { name, email, phone } = value;

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const result = await createContact({ name, email, phone });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { value, error } = contactBodySchema.validate(req.body);
  const { name, email, phone } = value;

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  try {
    const result = await updateContact({ name, email, phone });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { value, error } = favoriteBodySchema.validate(req.body);
  const { favorite } = value;

  if (error) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }

  try {
    const result = await updateContact(id, { favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await removeContact(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export { get, getById, create, update, updateStatusContact, remove };
