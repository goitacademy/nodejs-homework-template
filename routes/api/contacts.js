const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contactsCtrl");
const validation = require("../../middlewares/contactsValidation");
const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware, contactsController.getAll);

router.get("/:contactId", contactsController.getOne);

router.post("/", authMiddleware, validation.creatingContact, contactsController.addOne);

router.delete("/:contactId", authMiddleware, contactsController.deleteOne);

router.put("/:contactId", validation.updatingContact, contactsController.changeData);

router.patch("/:contactId/favorite", validation.updatingContactStatus, contactsController.changeValueOfFavorite);

module.exports = router;
