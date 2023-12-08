
import { HttpError } from '../helpers/index.js'
import { contactAddSchema, contactUpdateSchema } from '../models/contacts.js'
import contactUpdateFavoritesSchema from '../models/contacts.js';
import Contact from '../models/contacts.js';

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({})
    res.json(result);
  }
  catch (error) {
    next(error);
  }

}

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
}

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

const updateById = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400);
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (error) {
      throw HttpError(404);
    }
    res.json(result);
  }
  catch (error) {
    next(error);
  }
}
const updateFavoriteById = async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoritesSchema.validate(req.body);

    if (error) {
      throw HttpError(400, { message: "missing field favorite" });
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, { favorite: req.body.favorite }, { new: true });

    if (!result) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json({
      message: 'Contact deleted'
    })
  }
  catch (error) {
    next(error);
  }
}
export default {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
  updateFavoriteById
}