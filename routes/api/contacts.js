const express = require("express");
const router = express.Router();
const Joi = require("joi");
const pls = require("../../service/contacts");

// @ GET /api/contacts
router.get("/", async (_, res) => {
  const response = await pls.listContacts();
  if (!response) {
    res.status(400).json({
      message: "An error occured on attempt to read the contacts file",
    });
  }
  res.json(response);
});

// @ GET /api/contacts/:id
router.get("/:contactId", async (req, res) => {
  const response = await pls.getContactById(req.params.contactId);
  if (!response) {
    return res
      .status(404)
      .json(`Contact with id ${req.params.contactId} has not been found`);
  } else {
    return res.json(response);
  }
});

// @ DELETE /api/contacts/:id
router.delete("/:contactId", async (req, res) => {
  const response = await pls.removeContact(req.params.contactId);
  if (!response) {
    return res.status(404).json({
      message: `Contact with id ${req.params.contactId} has not been found`,
    });
  } else {
    return res.status(200).json(response);
  }
});

const postBodyScheme = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  phone: Joi.string().required(),
});

// @ POST /api/contacts
router.post("/", async (req, res) => {
  const validatedBody = postBodyScheme.validate(req.body);
  if (validatedBody.error?.details.length > 0) {
    return res
      .status(400)
      .json({ message: "Your request is not in proper format." });
  }
  const response = await pls.addContact(req.body);
  return res.status(201).json(response);
});

const putBodyScheme = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  phone: Joi.string(),
});

// @ PUT /api/contacts/:id
router.put("/:contactId", async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const validatedBody = putBodyScheme.validate(req.body);
  if (validatedBody.error?.details.length > 0) {
    return res
      .status(400)
      .json({ message: "Your request is not in proper format." });
  }

  const response = await pls.updateContact(req.params.contactId, req.body);

  if (!response) {
    return res.status(404).json({
      message: `Contact with id ${req.params.contactId} has not been found`,
    });
  } else {
    return res.status(200).json(response);
  }
});

const patchBodyScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

// @ PATCH /api/contacts/:contactId

router.patch("/:contactId", async (req, res) => {
  const validatedBody = patchBodyScheme.validate(req.body);
  if (validatedBody.error?.details.length > 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const response = await pls.updateStatusContact(
    req.params.contactId,
    req.body
  );
  if (!response) {
    return res.status(404).json({
      message: `Contact with id ${req.params.contactId} has not been found`,
    });
  } else {
    return res.status(200).json(response);
  }
});

module.exports = router;
