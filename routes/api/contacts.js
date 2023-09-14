const express = require("express");

const router = express.Router();

const controlers = require("../../controller/index");

const isValidId = require("../../Helpers/IsValidId");
// ------------------Get contacts------------------
router.get("/", controlers.get);

// ------------------Find by ID------------------
router.get("/:contactId", isValidId, controlers.findById);

// ------------------Add new contact------------------
router.post("/", controlers.addNewContact);

// ------------------Remove contact------------------
router.delete("/:contactId", isValidId, controlers.deleteContact);

// ------------------Update contact------------------
router.put("/:contactId", isValidId, controlers.updateContact);

// ------------------UpdateStatusContact------------------
router.patch("/:contactId/favorite", isValidId, controlers.updateStatusContact);

module.exports = router;
