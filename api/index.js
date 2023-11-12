const express = require("express");
const router = express.Router();
const ctrlTask = require("../controller/index.js");

router.get("/contacts", ctrlTask.get);
router.get("/contacts/:id", ctrlTask.getById);
router.post("/contacts", ctrlTask.create);
router.put("/contacts/:id", ctrlTask.update);
router.patch("/contacts/:id/favorite", ctrlTask.updateStatus);
router.delete("/contacts/:id", ctrlTask.remove);

module.exports = router;
