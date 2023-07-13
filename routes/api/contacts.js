const express = require("express");
const contactCtrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", contactCtrl.getAll);

router.get("/:contactId", contactCtrl.getById);

router.post("/", contactCtrl.addOne);

router.delete("/:contactId", contactCtrl.deleteById);

router.put("/:contactId", contactCtrl.updateById);

module.exports = router;
