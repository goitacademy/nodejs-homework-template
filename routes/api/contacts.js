const express = require("express");

const router = express.Router();
const Joi = require("joi");
const contacts = require("../../models/contacts");

function contactSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  validateRequest(req, res, next, schema);
}
function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.status(400).json({
      message: `Validation error: ${error.details
        .map((x) => x.message)
        .join(", ")}`,
    });
  } else {
    req.body = value;
    next();
  }
}

router.get("/", async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (result !== null) {
    res.status(200).json({
      status: "success",
      data: result,
    });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", contactSchema, async (req, res, next) => {
  const { name, email, phone } = req.body;
  await contacts
    .addContact({ name, email, phone })
    .then((result) =>
      res.status(201).json({
        status: "success",
        code: 201,
        data: { result },
      })
    )
    .catch(next);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (result !== -1) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", contactSchema, async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  contacts
    .updateContact(contactId, { name, email, phone })
    .then((result) => res.status(200).json({ data: { result } }))
    .catch((err) => res.status(404).json({ message: err.message }));
});

module.exports = router;
