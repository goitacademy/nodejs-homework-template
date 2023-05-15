const service = require("../service");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(14).max(20).required(),
  favorite: Joi.boolean(),
});

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
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
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId);
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
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: "missing required field" });
  try {
    const result = await service.createContact({ name, email, phone });
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
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: "missing required field" });
  try {
    const result = await service.updateContact(contactId, {
      name,
      email,
      phone,
    });
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
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  const { error } = contactSchema.validate({ favorite });
  if (error) return res.status(400).json({ message: "missing field favorite" });
  try {
    const result = await service.updateContact(contactId, { favorite });
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
        message: `Not found`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.removeContact(contactId);
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
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
};
