const express = require('express')
const router = express.Router()
const RequestError  = require('../../helpers/requestError')
const isValidId = require('../../helpers/validId');

const {Contact} = require('../../models/contact');
const { schema } = require('../../models/contact');
const {updateFavoriteSchema} = require('../../models/contact');




router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result)
  } catch (error) {
    next(error)
  }
});

router.get('/:contactId', isValidId,  async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, `Not found contact`);
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
        if(error) {
            throw RequestError(400, error.message)
        }
        const result = await Contact.create(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error);
    }
})

router.delete('/:contactId', isValidId, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json({
      message: "delete success"
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', isValidId, async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw RequestError(404, `Not found contact ${contactId}`);
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.patch('/:contactId/favorite', isValidId, async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw RequestError(400, `missing field favorite`);
    }
    res.json(result)
  } catch (error) {
    next(error);
  }
})

module.exports = router;
