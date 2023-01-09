const express = require("express");
const Joi = require("joi");
const {
  getContacts,
  getById,
  updateContactById,
  createContact,
  deleteContactById,
  setFavorite,
} = require("../../models/contacts");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { deny: ["ru"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ tlds: { deny: ["ru"] } }),
  phone: Joi.string(),
}).or("name", "email", "phone");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const validation = schema.validate(body);

  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  return next();
};

const router = express.Router();

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", validator(addContactSchema), createContact);

router.delete("/:contactId", deleteContactById);

router.put("/:contactId", validator(updateContactSchema), updateContactById);

router.patch(
  "/:contactId/favorite",
  validator(updateFavoriteSchema),
  setFavorite
);

module.exports = router;
