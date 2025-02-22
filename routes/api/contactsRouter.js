const express = require("express");
const contactsController = require("../../controllers/contactsControllers");
const {validateBody} = require("../../decorators");
const schemas = require("../../schemas/contactSchema");
const {isBodyEmpty, isFavoriteEmpty, isValidId, authenticate} = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.allContacts);

router.get("/:id", isValidId, contactsController.oneContact);

router.post("/", isBodyEmpty, validateBody(schemas.contactSchema), contactsController.add);

router.delete("/:id",isValidId, contactsController.deleteContact);

router.put("/:id", isValidId, isBodyEmpty, validateBody(schemas.contactSchema), contactsController.updateById);

router.patch("/:id/favorite", isValidId, isFavoriteEmpty, validateBody(schemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact)
module.exports = router;
