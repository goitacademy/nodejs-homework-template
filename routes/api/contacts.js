const express = require("express");
const router = express.Router();
const ctrl =  require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const {schemas} = require("../../models/contact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);
 
router.post("/", validateBody(schemas.addSchema),ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact); 
  
router.put("/:contactId", validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", validateBody(schemas.updateFavorite), ctrl.updateStatusContact);

module.exports = router;
   