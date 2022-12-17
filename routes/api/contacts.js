const express = require("express");

const ctrl = require("../../controllers/contacts");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.add);

router.put("/:contactId", isValidId, ctrl.updateById);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

router.delete("/:contactId", isValidId, ctrl.deleteById);

module.exports = router;
