const express = require("express");
const router = express.Router();
const { basedir } = global;
const ctrl = require(`${basedir}/controllers/contacts`);
const { auth } = require(`${basedir}/middlewares`);
const { ctrlWrapper } = require(`${basedir}/helpers`);

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", auth, ctrlWrapper(ctrl.getById));

router.post("/", auth, ctrlWrapper(ctrl.addContact));

router.put("/:id", auth, ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", auth, ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", auth, ctrlWrapper(ctrl.removeById));
const { ctrlWrapper } = require(`${basedir}/helpers`);

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(ctrl.add));

router.put("/:id", ctrlWrapper(ctrl.updateById));

router.patch("/:id/favorite", ctrlWrapper(ctrl.updateFavorite));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
