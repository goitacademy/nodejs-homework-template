const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/jwt.js");

const {
    createContact,
    deleteContactById,
    getAllContacts,
    getContact,
    updateContactById,
    updateFavoriteStatus,
} = require("../../controllers/contacts/index.js");

router.use(authMiddleware);

router.get("/", async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const favorite = req.query.favorite === "true";
    getAllContacts(req, res, page, limit, favorite);
});

router.get("/:contactId", async (req, res, next) => {
    getContact(req, res);
});

router.post("/", async (req, res, next) => {
    createContact(req, res);
});

router.delete("/:contactId", async (req, res, next) => {
    deleteContactById(req, res);
});

router.put("/:contactId", async (req, res, next) => {
    updateContactById(req, res);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
    updateFavoriteStatus(req, res);
});

module.exports = router;