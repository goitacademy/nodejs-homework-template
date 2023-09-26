import express from "express";
import ctrl from "../../controllers/contacts.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.postAddContact);

router.delete("/:id", ctrl.deleteById);

router.put("/:id", ctrl.putUpdateById);

export default router;
