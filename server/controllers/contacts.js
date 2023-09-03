import contactsService from "../services/contacts.js";
import {
  contactCreateSchema,
  contactUpdateSchema,
  contactUpdateFavSchema,
} from "../utils/validation.js";

const getAll = async (req, res, next) => {
  try {
    const { user, query, pagination } = req;
    const { startIndex, endIndex } = pagination;
    const { favorite } = query;
    const results = await contactsService.getAll(user.id, favorite);
    const contacts = results.slice(startIndex, endIndex);
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: contacts,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { user, params } = req;
    const { id } = params;
    const results = await contactsService.getOne(id, user.id);
    if (!results) {
      return res.status(404).json({
        status: "not-found",
        code: 404,
        data: {
          contact: results,
        },
      });
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { user, body } = req;
    const { error } = contactCreateSchema.validate(req.body);
    if (error?.message) {
      return res.status(400).send({ error: error.message });
    }
    const results = await contactsService.create(user.id, body);
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user, body } = req;
    const { error } = contactUpdateSchema.validate(req.body);
    if (error?.message) {
      return res.status(400).send({ error: error.message });
    }
    const results = await contactsService.update(id, user.id, body);
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { user, params, body } = req;
    const { id } = params;
    const { favorite } = body;
    const { error } = contactUpdateFavSchema.validate(req.body);
    if (error?.message) {
      return res.status(400).send({ error: error.message });
    }
    const results = await contactsService.updateFavorite(id, user.id, favorite);
    return res.json({
      status: "success",
      code: 200,
      data: {
        contact: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const results = await contactsService.remove(id, user.id);
    return res.json({
      status: "success",
      code: 200,
      data: {
        id,
        data: {
          contact: results,
        },
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const contactsController = {
  getAll,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};

export default contactsController;
