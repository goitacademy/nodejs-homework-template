const express = require("express");

const router = express.Router();

const ctrl = require('../../controllers/controllers');

const { isValidId } = require('../../helpers')


// GET ALL
router.get("/", ctrl.getAll);

// GET BY ID
router.get("/:contactId", isValidId, ctrl.getById);

// CREATE
router.post("/", ctrl.addContact);

// DELETE
router.delete("/:contactId", isValidId, ctrl.deleteContact);

// UPDATE
router.put("/:contactId", isValidId, ctrl.updateContact);

// ADD TO FAVORITE
router.patch("/:contactId/favorite", isValidId, ctrl.addToFavorite);

module.exports = router;
