const express = require("express");
const router = express.Router();
const { ErrorHttp } = require("../../helpers/index.js");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { validation } = require("../../middlewares");
const { contactSchema } = require("../../shema");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const result = await getContactById(req.params.contactId);

  if (!result) {
    return next(ErrorHttp(404, "Not found"));
  }
  res.status(200).json({ result });
});

router.post("/", validation(contactSchema), async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return next(ErrorHttp(400, "missing required name field"));
    }
    const result = await addContact(req.body, res);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      return next(ErrorHttp(404, "Not found"));
    }
    res.status(200).json({ result, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validation(contactSchema), async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return next(ErrorHttp(400, "missing fields"));
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      return next(ErrorHttp(404, "Not found"));
    }
    res.json({ result, message: "put contact" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
