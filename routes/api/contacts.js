const express = require('express');
const Joi = require('joi');
const Contact = require('../../models/contact');
const {HttpError} = require("../../helpers");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const router = express.Router();

router.get('/', async (_, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  }
  catch(error) {
      next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    // Contact.findOne - пошук по будь-якому полю (name, email, phone)
    // const result = await Contact.findOne({ _id: id });
    const result = await Contact.findById(id);
    if (!result) {
      throw HttpError(404, 'Not Found');
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});


router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { id } = req.params;    
    const result = await Contact.findByIdAndUpdate(id, req.body, {new: true}); // {new: true} - повернення нової версії док-та
    if (!result) {
      throw HttpError(404, 'Not Found')
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
});

router.patch('/:id/favorite', async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true }); // {new: true} - повернення нової версії док-та
    if (!result) {
      throw HttpError(404, 'Not Found');
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id);
    // console.log(result);
    if (!result) {
      throw HttpError(404, 'Not Found');
    }
    res.json({ message: 'Delete success' });
  } catch (error) {
    next(error)
  }
});

module.exports = router;