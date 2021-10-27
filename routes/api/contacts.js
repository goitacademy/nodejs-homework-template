const express = require("express")
const router = express.Router()
const functions = require("../../model/index")
const middleware = require("../../middlewares/contactsMiddleware")

// router.get("/", functions.listContacts)

router.get("/", middleware.getOnlyFavoriteMiddleware, functions.listContacts)

router.get("/", middleware.paginateMiddleware, functions.listContacts)

router.get("/:contactId", functions.getContactById)

router.post("/", functions.addContact)

router.delete("/:contactId", functions.removeContact)

router.patch("/:contactId", functions.updateContact)

router.patch("/:contactId/favorite", functions.updateFavorite)

module.exports = router
