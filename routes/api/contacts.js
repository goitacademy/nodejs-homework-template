const express = require('express');
const router = express.Router();
const { CreateError, BadRequest, NotFound } = require('http-errors');
const { Contact, joiAddSchema, joiUpdSchema } = require('../../model');

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const result = await Contact.findById(id);
    if (!result) {
      throw new NotFound();
    }
    res.json(result);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      error.status = 404;
    }
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiAddSchema.validate(req.body);
    if (error) {
      throw new BadRequest();
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes('contact validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const deletedContact = await Contact.findByIdAndRemove(id);
    if (!deletedContact) {
      throw new NotFound();
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed for value')) {
      error.status = 404;
    }
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const { error } = joiUpdSchema.validate(req.body);
    if (error) {
      throw new BadRequest();
    }
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      throw new NotFound();
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message.includes('contact validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const { favorite } = req.body;

    if (favorite === undefined) {
      throw new BadRequest('missing field favorite');
    }

    const { error } = joiUpdSchema.validate(req.body);
    if (error) {
      throw new BadRequest();
    }
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
      },
    );
    if (!updatedContact) {
      throw new NotFound();
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message.includes('contact validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

module.exports = router;
