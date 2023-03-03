const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const { authorize, validateBody } = require("../../middlewares");
const controllers = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const schema = require("../../schemas");

const router = express.Router();

router.get("/", authorize, controllerWrapper(controllers.getAll));

router.get("/:contactId", authorize, controllerWrapper(controllers.getById));

router.post(
  "/",
  authorize,
  validateBody(schema.contactSchema),
  controllerWrapper(controllers.add)
);

router.delete("/:contactId", controllerWrapper(controllers.remove));

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  controllerWrapper(controllers.update)
);
router.patch(
  "/:contactId/favorite",
  validateBody(schema.favoriteSchema),
  controllerWrapper(controllers.updateFavorite)
);

module.exports = router;
