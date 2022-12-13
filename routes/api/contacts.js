const express = require("express");
const controllers = require("../../controllers/contacts");
const { Wrapper } = require("../../helpers");
const validateBody = require("../../middleware/validateBody");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", Wrapper(controllers.listContacts));

router.get("/:id", Wrapper(controllers.getContactById));

router.post("/", validateBody(schemas.addSchema), Wrapper(controllers.add));

router.delete("/:id", Wrapper(controllers.removeContact));

router.put(
  "/:id",
  validateBody(schemas.addSchema),
  Wrapper(controllers.updateContact)
);

router.patch(
  "/:id/favorite",
  validateBody(schemas.updateFavoriteSchema),
  Wrapper(controllers.patch)
);

module.exports = router;
