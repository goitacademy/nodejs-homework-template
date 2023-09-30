import express from "express";
import Joi from "joi";
// const express = require('express')
import * as contactsService from "../../models/index.js";

import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();
// const router = express.Router()

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" required field`
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
  // res.json({ message: 'template message' })
})

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
        throw HttpError(404, `Contact with ${id} not found`);
    }
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
  // res.json({ message: 'template message' })
})

contactsRouter.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
}
catch (error) {
    next(error);
}
  // res.json({ message: 'template message' })
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.deleteContactById(id);
    if (!result) {
        throw HttpError(404, 'Not found');
    }

    // res.status(204).send()

    res.status(204).json({
        message: "Contact deleted"
    })
}
catch(error) {
    next(error);
}
  // res.json({ message: 'template message' })
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const { id } = req.params;

    const result = await contactsService.updateContactById(id, req.body);
    if (!result) {
        throw HttpError(404, 'Not found' );
    }

    res.status(200).json(result);
}
catch (error) {
    next(error);
}
  // res.json({ message: 'template message' })
})

export default contactsRouter;
// module.exports = router
