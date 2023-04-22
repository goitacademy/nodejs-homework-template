const express = require("express");
const ctrl = require("..//..//controllers/controllers")
const validateBody  = require("..//..//validations/validations");
const { schemas } = require("..//..//models/contacts");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContacts);

router.put("/:contactId", validateBody(schemas.putSchema), ctrl.updateContacts);

router.patch("/:contactId/favorite", validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete("/:contactId", ctrl.removeContacts);

module.exports = router;