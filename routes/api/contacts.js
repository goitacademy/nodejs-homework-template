const express = require("express");
const { asyncWrapper } = require("../../async-wrapper");
const router = express.Router();
const validateBody = require("../../middlewares/validateBody");
const Joi = require("joi");
const mongoose = require("mongoose");
const { isObjectId } = require("../../middlewares/joi");
const validate = require("express");

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://natalinardikh:gP89RLEKMO6MNynm@cluster0.48dfbeo.mongodb.net/db-contacts"
    );
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
main();

const addContactsShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});
const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).min(1);

const contactIdShema = Joi.object({
  id: Joi.string().custom(isObjectId).required(),
});
const {
  contactList,
  contactById,
  contactPost,
  contsctDelete,
  contactPut,
  contactPatch,
} = require("./contacts.controller");

router.get("/", contactList);

router.get(
  "/:contactId",
  validate(contactIdShema, "params"),
  asyncWrapper(contactById)
);

router.post("/", validateBody(addContactsShema), asyncWrapper(contactPost));

router.delete("/:contactId", contsctDelete);

router.put("/:contactId", validateBody(schemaUpdate), contactPut);

router.patch("/:contactId/favorite", validateBody(schemaUpdate), contactPatch);

module.exports = router;
