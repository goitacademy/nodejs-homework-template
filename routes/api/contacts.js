const express = require("express");
const ctrl = require('../../controllers/contacts')

const router = express.Router();

router.get("/", ctrl.getAll );

router.get("/:contactId", ctrl.getContactById);

router.post("/", ctrl.add );

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", ctrl.update);

module.exports = router;
