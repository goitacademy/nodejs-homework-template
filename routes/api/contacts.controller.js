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
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
} = require("../../modules/contacts");


router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});

router.get(
  "/:contactId",
  validate(contactIdShema, "params"),
  asyncWrapper(async (req, res, next) => {
    const data = await getContactById(req.params.contactId);
    if (!data) {
      res.json({ message: "Not found", status: 404 });
    }
    res.json(data);
  })
);

router.post(
  "/",
  validateBody(addContactsShema),
  asyncWrapper(async (req, res, next) => {
    const { name, email, phone } = req.body;
    const data = await addContact(name, email, phone);
    res.status(201).json(data);
  })
);

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  if (!data) {
    res.json({ message: "Not found", status: 404 });
  }
  res.json({ message: "contact deleted" });
});

router.put(
  "/:contactId",
  validateBody(schemaUpdate),
  async (req, res, next) => {
    const data = await updateContact(req.params.contactId, req.body);
    if (!data) {
      res.json({ message: "missing fields", status: 404 });
    }
    res.json(data);
  }
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemaUpdate),
  async (req, res, next) => {
    console.log(req.body);
    const data = await updateStatusContact(req.params.contactId, req.body);
   
    if (!data) {
      res.json({ message: " Not found ", status: 404 });
    }
    res.json(data);
  }
);

module.exports = router;
