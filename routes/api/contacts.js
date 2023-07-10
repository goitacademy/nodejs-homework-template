const express = require("express");
const router = express.Router();
const ctrlTask = require("../../controller/contacts.js");
const { auth } = require("../../controller/tokenAuth.js");

router.get("/", auth, ctrlTask.get);

router.get("/:contactId", auth, ctrlTask.getById);

router.post("/", auth, ctrlTask.create);

router.put("/:contactId", auth, ctrlTask.update);

router.patch("/:contactId/favorite", auth, ctrlTask.updateStatus);

router.delete("/:contactId", auth, ctrlTask.remove);

module.exports = router;
