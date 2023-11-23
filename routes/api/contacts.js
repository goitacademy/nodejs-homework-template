const express = require("express");

const router = express.Router();

const ctrl = require('../../controllers/controllers');


// GET ALL
router.get("/", ctrl.getAll);

// GET BY ID
router.get("/:contactId", ctrl.getById);

// CREATE
router.post("/", ctrl.addContact);

// DELETE
router.delete("/:contactId", ctrl.deleteContact);

// UPDATE
router.put("/:contactId", ctrl.updateContact);

module.exports = router;
