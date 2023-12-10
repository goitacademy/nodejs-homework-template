const express = require("express");

const router = express.Router();

const cntrl = require("../../controllers/contacts");
router.get("/", cntrl.getAll);

router.get("/:contactId", cntrl.getById);

router.post("/", cntrl.add);

router.delete("/:contactId", cntrl.deleteById);

router.put("/:contactId", cntrl.update);

module.exports = router;
