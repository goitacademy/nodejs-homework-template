const func = require("../../models/contacts");

const express = require("express");

const router = express.Router();
const Joi = require("joi");

const PostContactShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)
    .required(),
});

const UpdateContactShema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
  ),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  const data = await func.listContacts();

  res.json({
    status: "success",
    code: 200,
    contacts: data,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const data = await func.getContactById(req.params.contactId);

  data !== "Not found"
    ? res.json({
        status: "success",
        code: 200,
        contact: data,
      })
    : res.status(404).json({
        status: "undefined",
        code: 404,
        message: "Not found",
      });
});

router.post("/", async (req, res, next) => {
  const { error } = PostContactShema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "missing required name field",
    });
  }

  const data = await func.addContact(req.body);

  res.status(201).json({
    message: "contact added",
    status: 201,
    data: data,
  });
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await func.removeContact(req.params.contactId);

  data !== "Not found"
    ? res.status(200).json({
        status: 200,
        message: `Contact was deleted`,
        contact: data,
      })
    : res.status(404).json({
        status: 404,
        message: "Not found",
      });
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = UpdateContactShema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: "missing fields",
    });
  }
  const data = await func.updateContact(req.params.contactId, req.body);
  data !== "Not found"
    ? res.status(200).json({
        message: "contact updated",
        status: 200,
        data: data,
      })
    : res.status(404).json({
        message: "Not found",
        status: 404,
      });
});

module.exports = router;
