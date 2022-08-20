const express = require("express");
// const Joi = require("joi");

// const contacts = require("../../models/contacts");

const ctrl = require("../../controllers/contacts");

// const { RequestError } = require("../../helpers");

const { ctrlWrapper } = require("../../helpers");

const { validationBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

// ? выносим в отдельную папку
// const contactSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": `missing required name field`,
//   }),
//   email: Joi.string().required().messages({
//     "any.required": `missing required email field`,
//   }),
//   phone: Joi.string().required().messages({
//     "any.required": `missing required phone field`,
//   }),
// });

// ? выносим функции-контроллеры в отдельную папку
// router.get("/", async (_, res, next) => {
//   try {
//     const result = await contacts.listContacts();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// });
router.get("/", ctrlWrapper(ctrl.getAll));

// ?
router.get("/:contactId", ctrlWrapper(ctrl.getById));

// ?
router.post("/", validationBody(schemas.add), ctrlWrapper(ctrl.add));

// ?
router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

// ?
router.put(
  "/:contactId",
  validationBody(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
