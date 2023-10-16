const express = require("express");
const router = express.Router();
const ctrl =  require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const authenticate = require("../../middlewares/authenticate");
const {schemas} = require("../../models/contact");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);
 
router.post("/", authenticate, validateBody(schemas.addSchema),ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.removeContact); 
  
router.put("/:contactId", authenticate, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", authenticate, validateBody(schemas.updateFavorite), ctrl.updateStatusContact);

module.exports = router;
   