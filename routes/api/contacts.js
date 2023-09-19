const express = require("express");
const router = express.Router();

const { HttpError } = require("../../helpers");
const contacts = require("../../models/contacts");
const schema = require("../../schema/schema");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("POST", req.body);

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing required name field");
    }

    const result = await contacts.addContact(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  // res.json({ message: "template message" });
});

router.put("/:id", async (req, res, next) => {
  // res.json({ message: "template message" });
});

module.exports = router;
