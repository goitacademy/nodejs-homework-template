const express = require("express");
const ctrlContacts = require("./controller.js");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]*$/)
    .required(),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({ favorite: Joi.boolean().required() });

const validator = (schema) => (req, res, next) => {
  const body = req.body;
  const valid = schema.validate(body);
  if (valid.error) {
    res.status(400).json({ error: valid.error.details[0].message });
    return;
  }
  return next();
};

router.get("/", ctrlContacts.get);

router.get("/:contactId", ctrlContacts.getById);

router.post("/", validator(contactSchema), ctrlContacts.create);

router.delete("/:contactId", ctrlContacts.remove);

router.put("/:contactId", validator(contactSchema), ctrlContacts.update);

router.patch(
  "/:contactId/favorite",
  validator(favoriteSchema),
  ctrlContacts.updateFavorite
);

module.exports = router;
