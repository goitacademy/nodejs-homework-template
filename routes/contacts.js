import { Router } from "express";
import controllers from "./controllers/contacts/index";
import {
  validateCreate,
  validateUpdate,
  validateFavoriteUpdate,
} from "../../midllewares/validation/contactValidation";
import guard from "../../midllewares/guard";

const router = Router();

router.get("/", guard, controllers.getContacts);
router.get("/:id", guard, controllers.getContactById);
router.delete("/:id", guard, controllers.removeContactById);
router.post("/", [guard, validateCreate], controllers.postNewContact);
router.put("/:id", [guard, validateUpdate], controllers.updateContactById);
router.patch(
  "/:id/favorite",
  [guard, validateFavoriteUpdate],
  controllers.updateContactById
);

export default router;
