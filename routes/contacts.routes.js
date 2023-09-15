const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contacts.controller");
const { get, getOne, create, update, updateStatus, remove } = contactController;
const auth = require("../middlewares/auth");

router.get("/", auth, get);

router.get("/:contactId", auth, getOne);

router.post("/", auth, create);

router.put("/:contactId", auth, update);

router.patch("/:contactId/favorite", auth, updateStatus);

router.delete("/:contactId", auth, remove);

module.exports = router;
