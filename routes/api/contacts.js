const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;

      // return res.status(404).json({
      //   message: "Not found"
      // })
    }
    res.json(result);
  } catch(error) {
    next(error);

    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message,
    // })
    // res.status(404).json({
    //   message: "Server error"
    // })
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
});


router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.removeById(id);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    // res.status(204).json({
    //   message: "Delete success"
    // })
    res.json({
      message: "Delete success"
    })
  }
  catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "NotFound")
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
});

module.exports = router;
