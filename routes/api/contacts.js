const express = require("express");
const router = express.Router();

const { contacts: controllers } = require("../../controllers");
const { auth, validation } = require("../../middlewares");
const { joiContactShema, joiFavoriteShema } = require("../../models/contact");

router.get("/", auth, controllers.listContacts);

router.get("/:contactId", controllers.getContactById);

router.post("/", auth, validation(joiContactShema), controllers.addContact);

router.delete("/:contactId", controllers.removeContact);

router.put(
  "/:contactId",
  validation(joiContactShema),
  controllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  validation(joiFavoriteShema),
  controllers.updateByFavorite
);

module.exports = router;
