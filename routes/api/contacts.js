const express = require("express");

const {
  contacts: { getAll, getById, add, updateById, removeById },
} = require("../../controllers");

const {validateBody} = require('../../middlewares')

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(), add);

// router.put("/:contactId", validateBody(), updateById);

// router.delete("/:contactId", removeById);

module.exports = router;
