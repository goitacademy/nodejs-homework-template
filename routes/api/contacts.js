const express = require("express");
const controller = require("../../controllers/contacts");

const { route } = require("../../consts");

const router = express.Router();

router.get(route.BASE, controller.getAll);

router.get(route.ID, controller.getById);

router.post(route.BASE, controller.addItem);

router.delete(route.ID, controller.deleteItem);

router.put(route.ID, controller.updateItemById);

module.exports = router;
