import express from "express";

import contactController from "../../controller/contactController.js";

import isValidId from "../../middlewars/isValidld.js";

import authenticate from '../../middlewars/authenticate.js';


const router = express.Router();

router.use(authenticate);

router.get("/", contactController.getAll );

router.get("/:id", isValidId,  contactController.getById);

router.post("/", contactController.add);

router.delete("/:id", isValidId, contactController.deleteById);

router.put("/:id", isValidId, contactController.updateById);

router.patch("/:id/favorite", isValidId, contactController.updateStatusContact);

export default router;
