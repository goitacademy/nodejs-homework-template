const service = require("../service");
const Joi = require("joi");

const newContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  phone: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  favourite: Joi.boolean().required,
  description: Joi.string(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2),
  phone: Joi.string().min(5),
  email: Joi.string().email(),
  favourite: Joi.boolean(),
  description: Joi.string(),
}).or("name", "phone", "email", "favourite", "description");

const get = async (_, res, next) => {
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
  const { id } = req.params;
  try {
    const result = await service.getContactById(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { name, phone, email, favourite, description } = req.body;
  try {
    const result = await service.createContact({
      name,
      phone,
      email,
      favourite,
      description,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { task: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, email, favourite, description } = req.body;
  try {
    const result = await service.updateTask(id, {
      name,
      phone,
      email,
      favourite,
      description,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { isFavourite = false } = req.body;

  try {
    const result = await service.updateContact(id, { isFavourite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
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
    const result = await service.removeContact(id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { task: result },
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

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
