const express = require("express");
const router = express.Router();
const controllerContact = require("../../controllers/contacts");
const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
};

router.get("/", controllerContact.get);

router.get("/:contactId", controllerContact.getById);

router.post("/", controllerContact.create);

router.delete("/:contactId", validateObjectId, controllerContact.remove);

router.put("/:contactId", validateObjectId, controllerContact.update);

router.patch("/:contactId/favorite", controllerContact.favouriteStatus);

module.exports = router;
