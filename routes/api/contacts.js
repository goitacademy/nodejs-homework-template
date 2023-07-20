const ctrl = require('../../controllers/contacts')
const express = require("express");
const router = express.Router();



router.get("/", ctrl.allContacts);

router.get("/:contactId", ctrl.idContact);

router.post("/", ctrl.createContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", ctrl.refreshContact);


module.exports = router;