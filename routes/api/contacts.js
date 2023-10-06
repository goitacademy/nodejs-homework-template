const express = require("express");
const fn = require("../../models/contacts");
const errorHandler = require("../../helpers/errorHandler");
const schema = require("../../helpers/shemaValidation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await fn.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const contactById = await fn.getContactById(id);
    if (!contactById) {
      errorHandler(404);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    console.log(req.body);

    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0]);
      if (error.details[0].message.includes("is required")) {
        errorHandler(400, "missing required name field");
      }
      const text = error.details[0].message;
      errorHandler(400, text);
    }
    const newContact = await fn.addContact(name, email, phone);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const contactDeleteById = await fn.removeContact(id);
    if (contactDeleteById === null) {
      errorHandler(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.body) {
      errorHandler(400, "missing fields");
    }

    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0]);
      if (error.details[0].message.includes("is required")) {
        errorHandler(400, "missing required name field");
      }
      const text = error.details[0].message;
      errorHandler(400, text);
    }

    const result = await fn.updateContact(id, req.body);
    if (result === null) {
      errorHandler(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
