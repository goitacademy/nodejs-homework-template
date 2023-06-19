/** @format */

const express = require("express");
// const ctrl = require("../../controllers/contacts");
// const controller = require('../../controllers/contact/')
const controllerWrapper = require("../../helpers/controllerWrapper");
const ctrl = require("../../controllers/contacts/")

const { auth } = require("../../middlewares");


const router = express.Router();

router.get("/", auth, controllerWrapper(ctrl.getAll));


router.get("/:contactId", auth, (ctrl.getById));

router.post("/", auth, controllerWrapper(ctrl.add));

router.delete("/:contactId", auth, controllerWrapper(ctrl.remove));

router.put("/:contactId", auth, controllerWrapper(ctrl.update));

router.patch(
  "/:contactId/favorite",
  auth,
  controllerWrapper(ctrl.updateFavorite)
);

module.exports = router
