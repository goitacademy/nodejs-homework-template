import {
  getCurrentUserFilteredContactsFromDB,
  getCurrentUserContactByIdFromDB,
  createContactInDB,
  updateCurrentUserContactInDB,
  removeCurrentUserContactFromDB,
} from '../service/contacts.service.js';
import Joi from 'joi';

const contactReqBodySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().min(6).max(20).required(),
});

const favoriteReqBodySchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const getUserContactsList = async (req, res, next) => {
  try {
    const owner = req.user.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const favorite = req.query.favorite;

    const data = await getCurrentUserFilteredContactsFromDB({ favorite, owner, page, limit });
    if (!data) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `This page of contacts were not found`,
        data: 'Not Found',
      });
    }
    const contacts = data.contacts;
    const pagination = data.pagination;

    return res.header('pagination', JSON.stringify(pagination)).json({
      status: 'success',
      code: 200,
      pagination,
      data: {
        contacts,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const id = req.params.id;
  const owner = req.user.id;
  try {
    const contact = await getCurrentUserContactByIdFromDB({ owner, id });
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { contact },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createContact = async (req, res, next) => {
  const { value, error } = contactReqBodySchema.validate(req.body);
  const { name, email, phone } = value;
  const owner = req.user.id;

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const contact = await createContactInDB({ name, email, phone, owner });

    res.status(201).json({
      status: 'success',
      code: 201,
      data: { createdContact: contact },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const { value, error } = contactReqBodySchema.validate(req.body);
  const { name, email, phone } = value;
  const { id } = req.params;
  const owner = req.user.id;

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const contact = await updateCurrentUserContactInDB({ id, name, email, phone, owner });
    if (contact) {
      res.json({
        status: 'success',
        code: 200,
        data: { updatedContact: contact },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { value, error } = favoriteReqBodySchema.validate(req.body);
  const { favorite } = value;
  const { id } = req.params;
  const owner = req.user.id;

  if (error) {
    return res.status(400).json({ message: 'missing field favorite' });
  }

  try {
    const result = await updateCurrentUserContactInDB({ id, owner, favorite });
    if (result) {
      res.json({
        status: 'Success',
        code: 200,
        data: { updatedContact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const owner = req.user.id;

  try {
    const result = await removeCurrentUserContactFromDB({ id, owner });
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { deletedContact: result },
      });
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${id}`,
        data: 'Not Found',
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export {
  getUserContactsList,
  getContactById,
  createContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
