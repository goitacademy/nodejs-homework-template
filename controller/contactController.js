import HttpError from "../helpers/HttpError.js";

import contactSchema from "../helpers/Validate.js"

import Contact from "../models/contact.js";

const getAll = async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1)*limit;
    const result = await Contact.find({owner}, "name email phone", {skip, limit}).populate("owner");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      next(HttpError(404));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactSchema.contactsSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      next(HttpError(404));
    }

    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400));
    }

    const { error } = contactSchema.contactsSchema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      next(HttpError(404));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing field favorite" ));
    }

    const { error } = contactSchema.contactUpdateFavoriteSchema.validate(
      req.body
    );
    if (error) {
      next(HttpError(400, error.message));
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      next(HttpError(404));
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
};
