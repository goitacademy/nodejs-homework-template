const Joi = require("joi");

const Contact = require("../models/contact");

const { ResponseError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.find({ owner });
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw ResponseError(404, "Not found");
  }
  res.json(result);
};

const post = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    console.log(error);
    const [path] = error.details[0].path;
    throw ResponseError(400, `missing requaired ${path} field`);
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
  if (!result) {
    throw ResponseError(404, "Not found");
  }
};

const put = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    console.log(error);
    const [path] = error.details[0].path;
    throw ResponseError(400, `missing requaired ${path} field`);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw ResponseError(404, "Not found");
  }

  res.status(200).json(result);
};

const patch = async (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (error) {
    console.log(error);
    const [path] = error.details[0].path;
    throw ResponseError(400, `missing ${path} field`);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw ResponseError(404, "Not found");
  }

  res.status(200).json(result);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw ResponseError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  post: ctrlWrapper(post),
  put: ctrlWrapper(put),
  patch: ctrlWrapper(patch),
  remove: ctrlWrapper(remove),
};
