const express = require("express");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .regex(/^.+@.+\..+$/),
  phone: Joi.string().required(),
});
// ---------------------------   G E T -----------------------------------------

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    // res.status(500).json({ message: "Server error" });
    next(error);
  }
});
// ----------------------------- GET  BY  ID------------------------------------------
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
      // const error = new Error("Not found!");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({ message: "Not found!" });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const {status = 500, message = "Server error"} = error;
    // res.status(status).json({message,})
  }
});
// -----------------------   P O S T   ------------------------------------------
router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
// --------------------------  D E L E T E  ------------------------------------------

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // console.log(contactId);
    const result = await contacts.removeContact(contactId);
    if (!result) throw HttpError(404, "Not found");
    // console.log(result);
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});
// ---------------------------  P U T  ------------------------------------------

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);
    const { contactId } = req.params;
    // console.log("id", contactId);
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    // console.log("req.body", req.body);
    // console.log("result", result);
    res.json(result);
  } catch (error) {}
});

module.exports = router;
