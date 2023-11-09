import express from "express";
import { validateBody } from "../../decorators/index.js";
import { joiSchema as schema } from "../../schemas/contacts/index.js";
import { mdw } from "../../middlewares/index.js";
import { ctrl } from "../../controllers/contacts/index.js";

export const router = express.Router();

router.use(mdw.authenticate);

router.use("/:id", mdw.validateId);

router.get("/", ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", validateBody(schema.add), ctrl.add);

router.put("/:id", validateBody(schema.add), ctrl.updateById);

router.delete("/:id", ctrl.removeById);

router.patch(
  "/:id/favorite",
  validateBody(schema.updateStatus),
  ctrl.updateStatusById
);
