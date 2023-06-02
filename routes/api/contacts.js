const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const {addSchema} = require("../../schemas/contacts");
console.log(ctrl);
const router = express.Router();
// ---------------------------   G E T -----------------------------------------

router.get("/", ctrl.getContacts);

// ----------------------------- GET  BY  ID------------------------------------------

// router.get("/:contactId", ctrl.getById);

// -----------------------   P O S T   ------------------------------------------

router.post("/", validateBody(addSchema), ctrl.createNewContact);

// --------------------------  D E L E T E  ------------------------------------------

// router.delete("/:contactId", ctrl.deleteContact);

// ---------------------------  P U T  ------------------------------------------

// router.put("/:contactId", validateBody(addSchema), ctrl.changeContact);

module.exports = router;

