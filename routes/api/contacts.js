const express = require("express");
const isValidId = require("../../middlewares/isValidID")
const router = express.Router();
const {schemas}=require("../../models/contact")
const controller = require("../../controllers/controllers");

router.get("/", controller.getContactRoute);

router.get("/:contactId",isValidId, controller.getContactRouteByID);

router.post("/", controller.postContactRoute);

// router.delete("/:contactId",isValidId, controller.deleteContactRoute);

router.put("/:contactId",isValidId, controller.putContactRoute);

router.patch('/:contactId/favorite', isValidId, controller.patchFavoriteRoute)


module.exports = router;
