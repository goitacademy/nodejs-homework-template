const Joi = require("joi");

const Contact = require("../models/contact")

const { ResponseError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
  
});

const getAll = async (req, res) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw ResponseError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      console.log(error);
      const [path] = error.details[0].path;
      throw ResponseError(400, `missing requaired ${path} field`);
    }

    const result = await Contact.create(req.body);
    res.status(201).json(result);
    if (!result) {
      throw ResponseError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

const put = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      console.log(error);
      const [path] = error.details[0].path;
      throw ResponseError(400, `missing requaired ${path} field`);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw ResponseError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const patch = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);

    if (error) {
      console.log(error);
      const [path] = error.details[0].path;
      throw ResponseError(400, `missing ${path} field`);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
      throw ResponseError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};


const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw ResponseError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  post,
  put,
  patch,
  remove,
};
