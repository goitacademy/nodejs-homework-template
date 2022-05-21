const express = require("express");


const router = express.Router();
const controller =require("../../controller/index");


router.get("/", controller.get);
router.get("/favorite", controller.getAllFavorite)
router.get("/:contactId", controller.getContactById);
router.post("/", controller.postNewContact)
router.delete("/:contactId", controller.deleteContact)
router.put("/:contactId", controller.updateContact)
router.patch("/:contactId/favorite", controller.updateContactFavorite)



module.exports = router;
