import express from "express";
import contactsControllers from "../../controllers/contacts-controller.js";
import {
    addSchema,
    updateFavoriteSchema,
    updateSchema,
} from "../../schemas/contacts-schemas.js";
import { validateBody } from "../../decorators/index.js";
import { isValidId } from "../../middlewares/index.js";

const router = express.Router();

router.get("/", contactsControllers.getAll);

router.get("/:contactId", isValidId, contactsControllers.getById);

router.post("/", validateBody(addSchema), contactsControllers.add);

router.put(
    "/:contactId",
    validateBody(updateSchema),
    isValidId,
    contactsControllers.updateById
);

router.delete("/:contactId", isValidId, contactsControllers.deleteById);

router.patch(
    "/:contactId/favorite",
    validateBody(updateFavoriteSchema),
    isValidId,
    contactsControllers.updateById
);

export default router;