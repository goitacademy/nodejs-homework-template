const service = require("../service");

const Joi = require("joi");

const contactSchema = function contactSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    favorite: Joi.boolean().required(),
  });
  validateRequest(req, res, next, schema);
};
function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`,
    });
  } else {
    req.body = value;
    next();
  }
}

const get = async (req, res, next) => {
  const result = await service.getAllContacts();
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.getContactById(id);
  if (result !== null) {
    res.status(200).json({
      status: "success",
      data: result,
    });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const create = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  await service
    .createContact({ name, email, phone, favorite })
    .then((result) =>
      res.status(201).json({
        status: "success",
        code: 201,
        data: { result },
      })
    )
    .catch(next);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.removeContact(id);
  if (result !== -1) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  service
    .updateContact(id, { name, email, phone, favorite })
    .then((result) => res.status(200).json({ data: { result } }))
    .catch((err) => res.status(404).json({ message: err.message }));
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite = false } = req.body;

  try {
    const result = await service.updateContact(id, { favorite });
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

module.exports = {
  contactSchema,
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
