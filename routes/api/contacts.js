const express = require("express");
const {Contact} = require("../../models/contact");
const {addSchema, updateSchema, updateFavoriteSchema} = require("../../models/contact")

const {RequestError} = require("../../helpers");
const {isValidId, authenticate} = require("../../middlewares")

const router = express.Router();

router.get('/', authenticate, async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10, favorite} = req.query;
    const skip = (page - 1) * limit;

    const filterContact = favorite ? { owner, favorite } : { owner };
    const result = await Contact.find(filterContact, "-createdAt -updatedAt", {skip, limit})
    .populate("owner", "name email");
  
    res.json(result)
  } 
  catch (error) {
    next(error)
  }
})

router.get('/:contactId', authenticate, isValidId,  async (req, res, next) => {
 try {
  const {_id: owner} = req.user;
  const { contactId: _id } = req.params;
  const response = await Contact.findOne({_id, owner});
  if(response === null){
    res.status(404).json({ message: 'Not found' })
  }
  else {
  res.json(response);
  };

 } 
 catch (error) {
  next(error)
 }
})

router.post('/', authenticate, async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message)
    }

    const {_id: owner} = req.user;
    const result = await Contact.create({...req.body, owner });

    res.status(201).json(result);
  } 
  catch (error) {
    next(error)
  }
})

router.put('/:contactId', authenticate, isValidId, async (req, res, next) => {
  try {
    const {error} = updateSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message)
    }

    const { contactId: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({_id, owner}, req.body, {new: true});
    if(!result) {
      throw RequestError(404, "Not found");
    }
  
    res.json(result);
  } 
  catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', authenticate, isValidId, async (req, res, next) => {
  try {
    const {error} = updateFavoriteSchema.validate(req.body);

    if (error) {
      throw RequestError(400, error.message)
    }

    const { contactId: _id } = req.params;
    const {_id: owner} = req.user;
    const result = await Contact.findOneAndUpdate({_id, owner}, req.body, {new: true});
    if(!result) {
      throw RequestError(404, "Not found");
    }
  
    res.json(result);
  } 
  catch (error) {
    next(error)
  }
})

router.delete('/:contactId', authenticate, isValidId, async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const { contactId: _id } = req.params;
    const result = await Contact.findOneAndDelete({_id, owner})
    if(!result) {
      throw RequestError(404, "Not found");
    }
    res.json({
      message: "Delete success"
    })
  } 
  catch (error) {
    next(error)
  }
})


module.exports = router;
