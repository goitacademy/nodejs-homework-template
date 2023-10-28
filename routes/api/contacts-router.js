import express from "express";
import ctrl from "../../controllers/contacts.js";
import { isValidId } from "../../middlewares/isValidId.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", ctrl.postAddContact);

router.delete("/:id", isValidId, ctrl.deleteById);

router.put("/:id", isValidId, ctrl.putUpdateById);

router.patch("/:id/favorite", isValidId, ctrl.patchUpdateById);

export default router;