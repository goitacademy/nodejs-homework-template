const express = require("express");

const Joi = require("joi");

const router = express.Router();

const contactsService = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" must be exist`
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" must be exist`
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" must be exist`
  }),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = contactsAddSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  }
  catch(error) {
    next(error)
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = contactsService.removeContact(id);
    if(!result) {
      throw HttpError(404, `Not Found`)
    }
    // res.json(result)
    res.json({
      message: "contact deleted"
    })
  }
  catch(error) {
    next(error)
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {error} = contactsAddSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.message)
    }
    const {id} = req.params;
    const result = contactsService.updateContactById(id, req.body);
    if(!result) {
      throw HttpError(404, `Not Found`)
    }
    res.json(result)

  }
  catch(error) {
    next(error)
  }
});

module.exports = router;
