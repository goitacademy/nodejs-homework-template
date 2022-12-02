const express = require("express");

const controllers = require("../../controllers/contacts");
const middlewares = require("../../middlewares");
const schemas = require("../../schemas");
const controllerWrapper = require("../../helpers/controllerWrapper");

const router = express.Router();

router.get("/", controllerWrapper(controllers.getAll));

router.get("/:id", controllerWrapper(controllers.getById));

router.post(
  "/",
  middlewares.validateBody(schemas.contact.addСontactsSchema),
  controllerWrapper(controllers.add)
);

router.put(
  "/:id",
  middlewares.validateBody(schemas.contact.addСontactsSchema),
  controllerWrapper(controllers.updateById)
);

router.patch(
  "/:id/favorite",
  middlewares.validateBody(schemas.contact.updateFavoriteByIdSchema),
  controllerWrapper(controllers.updateFavoriteById)
);

router.delete("/:id", controllerWrapper(controllers.removeById));

module.exports = router;
