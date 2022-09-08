const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../utils");

router.get("/contacts", ctrlWrapper(ctrl.getAll));

router.get("/contacts/:id", ctrlWrapper(ctrl.getById));

router.post("/contacts", ctrlWrapper(ctrl.addContact));

router.put("/contacts/:id", ctrlWrapper(ctrl.updateById));

router.patch("/contacts/:id/favorite", ctrlWrapper(ctrl.updateStatusContact));

router.delete("/contacts/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
