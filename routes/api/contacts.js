const express = require("express");
const { basedir } = global;
const { ctrlWrapper } = require(`${basedir}/helpers`);

const controller = require(`${basedir}/controllers/contacts`);

const router = express.Router();

router.get("/", ctrlWrapper(controller.getAll));

router.get("/:contactId", ctrlWrapper(controller.getById));

router.post("/", ctrlWrapper(controller.add));

router.delete("/:contactId", ctrlWrapper(controller.remove));

router.put("/:contactId", ctrlWrapper(controller.changeById));

router.put("/:contactId", ctrlWrapper(controller.changeById));

router.patch("/:contactId/favorite", ctrlWrapper(controller.changeFavorite));

module.exports = router;
