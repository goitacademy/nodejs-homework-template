import express from "express";

import controllers from "../../controllers/controllers.js";

const router = express.Router();

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", controllers.add);

router.put("/:contactId", controllers.updateById);

router.delete("/:contactId", controllers.deleteById);

export default router;

