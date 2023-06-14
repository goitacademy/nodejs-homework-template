const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const Contact = require("../../models/contactsMongo");

/* const Joi = require("joi"); */

/* const schema = Joi.object({
  name: Joi.string().alphanum().min(1).required(),

  phone: Joi.string()
    .regex(/^[0-9]{9}$/)
    .messages({ "string.pattern.base": `Phone number must have 9 digits.` })
    .required(),

  email: Joi.string().email().min(3).required(),
}); */

router.get("/", async (req, res, next) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    data = await Contact.findOne({ _id: req.params.contactId });
    /*     if (data) {
      return res.json(data);
    }
    res.status(404).json({
      status: "Not found",
      code: 404,
    }); */
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Contact.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    data = await Contact.findByIdAndRemove({ _id: req.params.contactId });
    if (data) {
      return res.json({
        message: `contact with ${req.params.contactId} deleted`,
      });
    }
    return res.json({ message: "contact not found" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true }
    );

    console.log(data);
    if (data) {
      return res.json(data);
    } else {
      res.status(404).json({
        status: "Not found",
        code: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    data = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      req.body,
      )
      res.json(data);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
