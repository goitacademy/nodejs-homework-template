import express from "express";
import { Router } from "express";

import * as ctrl from "../../controller/contacts.js";

const router = Router();

router.get("/", ctrl.get);

router.get("/:contactId", ctrl.getByID);

router.post("/", ctrl.create);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", ctrl.update);

router.patch("/:contactId/favorite", ctrl.patch);

export { router };
