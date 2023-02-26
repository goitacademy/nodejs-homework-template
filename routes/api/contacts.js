const express = require("express");

const router = express.Router();
const Joi = require("joi");
const Contacts = require("../../models/contacts");
const { CastError } = require("mongoose");

const PostContactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
  favorite: Joi.boolean().default(false),
});

const UpdateContactShema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
  ),
  favorite: Joi.boolean().default(false),
}).or("name", "email", "phone", "favorite");

const UpdateStatusContactShema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
  ),
  favorite: Joi.boolean().default(false).required(),
}).or("name", "email", "phone", "favorite");

router.get("/", async (req, res, next) => {
  const getContact = await Contacts.find({});
  try {
    getContact !== []
      ? res.json({
          status: "success",
          code: 200,
          contact: getContact,
        })
      : res.status(404).json({
          status: "undefined",
          code: 404,
          message: "Not found",
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const getContactById = await Contacts.findById({ _id: contactId });
    res.json({
      status: "success",
      code: 200,
      contact: getContactById,
    });
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = PostContactShema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "missing required name field",
      });
    }
    const addContact = await Contacts.insertMany([req.body]);

    res.status(201).json({
      message: "contact added",
      status: 201,
      data: addContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Contacts.deleteOne({ _id: contactId });
    res.status(200).json({
      status: 200,
      message: `Contact was deleted`,
      contact: deleteContact,
    });
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = UpdateContactShema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "missing fields",
      });
    }
    const updateContact = await Contacts.updateOne(
      { _id: contactId },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "contact updated",
      status: 200,
      data: updateContact,
    });
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});
router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = UpdateStatusContactShema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: "missing field favorite",
      });
    }
    const updateStatusContact = await Contacts.updateOne(
      { _id: contactId },
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "contact updated",
      status: 200,
      data: updateStatusContact,
    });
  } catch (error) {
    if (error instanceof CastError) {
      return res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
    }

    return res.status(500).json({
      error: "500 Internal Server Error",
    });
  }
});

module.exports = router;
