const express = require("express");
const router = express.Router();
const controllerContact = require('../../controller/contactsController/index')
const auth= require('../../middlewares/auth')
const authenticate =require('../../middlewares/authenticate')
// router.use(auth)

 router.use(authenticate)
//router.use(auth)
router.get("/", controllerContact.allContacts);

router.get("/:contactId", controllerContact.getById);

router.get("/search",controllerContact.serchInContacts);

router.post("/", controllerContact.addContact);

router.delete("/:contactId", controllerContact.removeContact);

router.put("/:contactId", controllerContact.updateContact);

router.patch("/:contactId",controllerContact.chengOfPart);
// router.patch(
//     "/:id/favorite",
//     authenticate,
//     isValidId,
//     validateBody(schemas.updateFavoriteSchems),
//     updateFavorite
//   );
module.exports = router;
