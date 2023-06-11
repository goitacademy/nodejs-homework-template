const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const {addSchema, favoriteValidationSchema} = require("../../models/contact");


const router = express.Router();
// ---------------------------------------  G E T -----------------------------------------

router.get("/", ctrl.getContacts);

// ---------------------------------------- GET  BY  ID------------------------------------------

router.get("/:contactId", isValidId, ctrl.getById);

// -----------------------------------   P O S T   ------------------------------------------

router.post("/", validateBody(addSchema), ctrl.createNewContact);

// -----------------------------------------  D E L E T E  ------------------------------------------

router.delete("/:contactId", isValidId, ctrl.deleteContact);

// ------------------------------------ P U T  ------------------------------------------

router.put("/:contactId", isValidId, validateBody(addSchema), ctrl.changeContact);

// ------------------------------- P A T C H -------------------------------------------

router.patch("/:contactId/favorite", isValidId, validateBody(favoriteValidationSchema), ctrl.updateFavorite);


// router.patch("/:id/favorite", isValidId, validateBody(schemas.bookUpdateFavoriteSchema), booksController.updateFavorite);

module.exports = router;

