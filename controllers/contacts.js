const { Contact, schemas } = require("../models");

const { RequestError } = require("../helpers");

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = schemas.postCheckingSchema.validate(req.body);

    if (error) {
      // console.log(error, error.context);
      throw RequestError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

    if (!result) {
      throw RequestError(400, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error } = schemas.putCheckingSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.patchCheckingSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing field favorite");
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  update,
  updateStatusContact,
};