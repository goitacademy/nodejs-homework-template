const express = require("express");
const createError = require("http-errors");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().min(99).required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({ status: "success", code: 200, result });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    if (!contact) {
      const error = new Error(`Not Found id:${id}`);
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: 200, contact });
  } catch (error) {
    // //APP// app.use((err, req, res, next) => {
    //   res.status(500).json({ message: err.message });
    // });
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      // eslint-disable-next-line new-cap
      throw new createError(400, error.message + "missing required name field");
    }
    const result = await addContact(req.body);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await removeContact(id);
    if (!data) {
      // eslint-disable-next-line new-cap
      throw new createError(404, "Contact not found");
    }
    res.status(200).json({ message: "contact deleted", data });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      // eslint-disable-next-line new-cap
      throw new createError(400, error.message + "missing fields");
    }
    const id = req.params.contactId;
    if (!id) {
      // eslint-disable-next-line new-cap
      throw new createError(404, "Not found");
    }
    await updateContact(id, req.body);
    res.json({ status: "success", code: 200, data: req.body });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
