const Joi = require("joi");
const service = require("../service");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts(req.user._id);
    res.json({
      status: "success",
      code: 200,
      data: { contacts: results.map((contact) => contact.toJSON()) },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.getContactById(req.user._id, id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result.toJSON() },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id: ${id} not found`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.details[0].message,
      });
    }

    const result = await service.createContact(req.user._id, req.body);

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result.toJSON() },
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.details[0].message,
      });
    }

    const result = await service.updateContact(req.user._id, id, req.body);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result.toJSON() },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id: ${id} not found`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing field 'favorite'",
    });
  }

  try {
    const result = await service.updateContact(req.user._id, id, { favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result.toJSON() },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id: ${id} not found`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await service.removeContact(req.user._id, id);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result.toJSON() },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id: ${id} not found`,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
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
