const express = require("express");
const router = express.Router();
const controlers = require("../../controllers/contacts");
const { isValidId } = require("../../middlewares/index");

router.get("/", controlers.getAll);

router.get("/:contactId", isValidId, controlers.getById);

router.post("/", controlers.postNew);

router.delete("/:contactId", isValidId, controlers.deleteById);

router.put("/:contactId", isValidId, controlers.updateById);

router.patch("/:contactId/favorite", isValidId, controlers.updateFavorite);

module.exports = router;
