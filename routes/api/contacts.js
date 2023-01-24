const express = require('express')

// const contactsOptions = require("../../models/contacts")

const {Contact} = require('../../models/contact');
const {schemas} = require("../../models/contact")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "-__v");
    return res.json({contacts});
  } catch (error) {
    next(error)

  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOne({_id: contactId},  "-__v");
    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        data: result
      }
    });

  } catch (error) {
    next(error)

  }

})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 404;
      throw error;
    }
    const result = await Contact.create(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: result,
      }
    })
  } catch (error) {
    next(error);
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        data: result
      }
    })
  } catch (error) {

  }
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!updateContact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        massage: `Contacts with id = ${contactId} not found`
      })
    }
    return res.json({
      status: "success",
      code: 200,
      data: {
        data: updateContact
      }
    })

  } catch (error) {
    next(error);

  }
})

module.exports = router
