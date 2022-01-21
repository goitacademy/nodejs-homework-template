const express = require('express');
const router = express.Router();
const { BadRequest, NotFound } = require('http-errors');
const { Contact, joiAddSchema, joiUpdSchema } = require('../../models');
const { authenticate } = require('../../middlewares');

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { favorite } = req.query;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;

    const skip = (page - 1) * limit;
    if (favorite) {
      const result = await Contact.find({ owner: _id, favorite }, '-__v', {
        skip,
        limit,
      });
      return res.json(result);
    }
    const result = await Contact.find({ owner: _id }, '-__v', {
      skip,
      limit,
    });
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', authenticate, async (req, res, next) => {
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

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { error } = joiAddSchema.validate(req.body);
    if (error) {
      throw new BadRequest();
    }
    const newContact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes('contact validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

router.delete('/:contactId', authenticate, async (req, res, next) => {
  const id = req.params.contactId;
  console.log(id);
  const { _id } = req.user;
  try {
    const deletedContact = await Contact.findOneAndDelete({
      id,
      owner: _id,
    });
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

router.put('/:contactId', authenticate, async (req, res, next) => {
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

router.patch('/:contactId/favorite', authenticate, async (req, res, next) => {
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
