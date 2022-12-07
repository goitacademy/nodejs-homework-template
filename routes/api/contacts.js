const express = require("express");
const router = express.Router();
const {
  get,
  getById,
  create,
  update,
  remove
} = require('../../controllers/controllers.js')

router.get("/", get);

router.get("/:contactId", getById);

router.post("/", create);

router.delete("/:contactId", remove);

router.put("/:contactId", update);

module.exports = router;
