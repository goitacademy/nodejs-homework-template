const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = express.Router();


router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addNewContact);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContactById);


module.exports = router;