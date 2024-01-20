import Contact from "../models/Contact.js";
import { HttpError } from "../helpers/index.js";
import { contactAddSchema, contactUpdateSchema, updateFavoriteSchema} from "../models/Contact.js";



const getAll = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const { page = 1, limit = 2 , favorite = false } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", {skip, limit}).populate("owner", "username");
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOne({ _id, owner});
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);

        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};
  
const add = async (req, res, next) => {
    try {
        const { error } = contactAddSchema.validate(req.body);
        const { _id: owner } = req.user;

        if (error) {
            throw HttpError(400, error.message);
        }
        const result = await Contact.create({...req.body, owner});
        res.status(201).json(result);
    }
    catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const { error } = contactUpdateSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }

        const result = await Contact.findOneAndUpdate({ _id, owner },req.body);
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        const { id: _id } = req.params;
        const { _id: owner } = req.user;
        const result = await Contact.findOne({ _id, owner });
        if (!result) {
            throw HttpError(404, `Contact with id=${id} not found`);
        }
        res.json({
            message: "Contact deleted"
        });
    }
    catch (error) {
        next(error);
    }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await Contact.findOneAndUpdate(id, req.body);
    if (!result) {
      throw HttpError(404, `Not found`);
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
    updateById,
    deleteById,
    updateStatusContact,
};