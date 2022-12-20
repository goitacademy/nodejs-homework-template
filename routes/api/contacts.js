const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    res.json(await listContacts());
    return res.status(200);
  } catch (err) {
    next(createError(err));
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId);
    if (!result) throw new Error("Not found");
    return res.json(result);
  } catch (err) {
    next(createError(400, err));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    if (!result) throw new Error("missing required name field");
    return res.status(201).json(result);
  } catch (err) {
    next(createError(400, err));
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);
    console.log(result);
    if (!result) throw new Error("Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(createError(400, err));
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const result = await updateContact(req.params.contactId, req.body);
    if (!result) throw new Error("Not found");
    if (typeof result === "string") {
      return res.status(400).json({ message: result });
    }
    res.status(200).json(result);
  } catch (err) {
    next(createError(400, err));
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    if (!req.body.favorite && typeof req.body.favorite !== "boolean")
      return res.status(400).json({ message: "missing field favorite" });
    const result = await updateStatusContact(req.params.contactId, req.body);
    if (!result) throw new Error("Not found");
    res.status(200).json(req.body);
  } catch (err) {
    next(createError(404, err));
  }
});

module.exports = router;