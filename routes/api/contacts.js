const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

// ---------------------------   G E T -----------------------------------------

router.get("/", ctrl.getContacts);

// ----------------------------- GET  BY  ID------------------------------------------

router.get("/:contactId", ctrl.getById);

// -----------------------   P O S T   ------------------------------------------

router.post("/", validateBody(schemas.addSchema), ctrl.createNewContact);

// --------------------------  D E L E T E  ------------------------------------------

router.delete("/:contactId", ctrl.deleteContact);

// ---------------------------  P U T  ------------------------------------------

router.put("/:contactId", validateBody(schemas.addSchema), ctrl.changeContact);

module.exports = router;
