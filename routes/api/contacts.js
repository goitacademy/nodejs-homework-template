const express = require("express");

const router = express.Router();

const ctrl = require ("../../controllers/contacts")


// ========== Routing for different features: 

// ===========getting List of All Contacts ================= 

router.get("/", ctrl.getAllContacts)

// ============Getting a given Contact by  ID ===============

router.get("/:contactId", ctrl.getContactById)

// =============Adding a Contact =============================

router.post("/", ctrl.addContact)

// ============ Deleting  a Contact ==========================

router.delete("/:contactId", ctrl.removeContact );

// ==============Updating a Contact ===========================

router.put("/:contactId", ctrl.updateContact );



module.exports = router;
