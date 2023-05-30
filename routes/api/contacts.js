const express = require("express");

const router = express.Router();

const controller = require("../../controllers/controllers");

router.get("/", controller.getContactRoute);

router.get("/:contactId", controller.getContactRouteByID);

router.post("/", controller.postContactRoute);

router.delete("/:contactId", controller.deleteContactRoute);

router.put("/:contactId", controller.putContactRoute);

module.exports = router;
