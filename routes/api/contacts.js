const express = require("express");
const { basedir } = global;
const { ctrlWrapper } = require(`${basedir}/helpers`);

const controller = require(`${basedir}/controllers/contacts`);

const { auth } = require(`${basedir}/middlewares`);

const router = express.Router();

router.get("/", auth,ctrlWrapper(controller.getAll));

router.get("/:contactId", auth, ctrlWrapper(controller.getById));

router.post("/", auth, ctrlWrapper(controller.add));

router.delete("/:contactId", auth, ctrlWrapper(controller.remove));

router.put("/:contactId", auth, ctrlWrapper(controller.changeById));

router.put("/:contactId", auth, ctrlWrapper(controller.changeById));

router.patch(
  "/:contactId/favorite",
  auth,
  ctrlWrapper(controller.changeFavorite)
);

module.exports = router;
