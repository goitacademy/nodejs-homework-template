const express = require('express')
const router = express.Router()
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const ResponseResult = (result, message = "success", status = 200) => {
  const response = {
    message,
    status,
    data: {
      result,
    },
  };
  return response;
};

const RequestError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(ResponseResult(result));
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw RequestError(404, "not found get");
    }
    res.json(ResponseResult(result));
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
    const result = await addContact(req.body);
    res.status(201).json(ResponseResult(result, "message added success", 201));
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw RequestError(404, "not found delete");
    }
    res.json(ResponseResult(result, "contact deleted", 200));
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing required name field");
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "not found put");
    }
    res.json(ResponseResult(result, "contact updated", 200));
  } catch (error) {
    next(error);
  }
})

module.exports = router
