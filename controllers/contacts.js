const service = require("../service");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().integer().positive().required(),
  favorite: Joi.bool(),
});

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: 200,
      data: { contacts: results },
    });
  } catch (err) {
    console.error("Error getting contacts list:", err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const result = await service.getContactById(id);
    if (result) {
      return res.json({
        status: 200,
        data: { contact: result },
      });
    }

    res.status(404).json({
      status: 404,
      message: "Not found",
    });
  } catch (err) {
    console.error("Error getting contact:", err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  const id = req.params.contactId;

  try {
    const result = await service.removeContact(id);
    if (result) {
      return res.json({
        status: 200,
        message: "Contact deleted",
      });
    }

    res.status(404).json({
      status: 404,
      message: "Not found",
    });
  } catch (err) {
    console.error("Error removing contact:", err);
    next(err);
  }
};

const create = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }

  try {
    const result = await service.createContact(req.body);
    res.status(201).json({
      status: 201,
      data: { newContact: result },
    });
  } catch (err) {
    console.error("Error creating contact:", err);
    next(err);
  }
};

const update = async (req, res, next) => {
  const id = req.params.contactId;
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }

  try {
    const result = await service.updateContact(id, req.body);
    if (result) {
      return res.json({
        status: 200,
        data: { newContact: result },
      });
    }

    res.status(404).json({
      status: 404,
      message: "Not found",
    });
  } catch (err) {
    console.error("Error updating contact:", err);
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  const id = req.params.contactId;
  const { error } = req.body;

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }

  try {
    const result = await service.updateContact(id, req.body);
    if (result) {
      return res.json({
        status: 200,
        data: { updatedContact: result },
      });
    }

    res.status(404).json({
      status: 404,
      message: "Not found",
    });
  } catch (err) {
    console.error("Error updating favorite status in contact:", err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  remove,
  create,
  update,
  updateStatus,
};
