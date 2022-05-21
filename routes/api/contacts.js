const express = require("express");


const router = express.Router();
const controller =require("../../controller/index");
const auth = require("../../middlewares/auth");


router.get("/", auth,controller.get);
router.get("/favorite",auth, controller.getAllFavorite)
router.get("/:contactId",auth, controller.getContactById);
router.post("/",auth, controller.postNewContact)
router.delete("/:contactId",auth, controller.deleteContact)
router.put("/:contactId",auth, controller.updateContact)
router.patch("/:contactId/favorite",auth, controller.updateContactFavorite)



module.exports = router;
