const express = require("express");
const ctrl = require("../../controllers/contacts");
// const validateBody = require("../../middlewares/validateBody");
// const schemas = require("../../schemas/contacts");
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.create);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", ctrl.update);

router.patch("/:contactId/favorite", ctrl.favorite);

module.exports = router;
