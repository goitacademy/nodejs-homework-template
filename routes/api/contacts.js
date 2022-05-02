const express = require('express');

const { createError } = require("../../helpers");

// const contacts = require("../../models/contacts");

const {Contact, contactJoiSchema} = require("../../models/contact")

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await Contact.find({}, "name email phone favorite");
    res.json(result);
  } catch(error) {
    next(error);
  } 
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // const isValid = isValidObjectId(contactId);
    // if (!isValid) {
    //   throw createError(404, "Not found")
    // }
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404, "Not found")
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }

    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, "Not found")
    }
    res.json({
      message: "contact deleted"
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw createError(404)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(contactId, req.body, { new: true });
    if (!result) {
      throw createError(404)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
