const express = require("express");

const router = express.Router();

const {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
} = require("../../controll/contacts");

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", add);

router.delete("/:contactId", deleteById);

router.put("/:contactId", updateById);

module.exports = router;