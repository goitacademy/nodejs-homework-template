const {
    get,
    getOne,
    add,
    remove,
    update,
    updateStatus,
  } = require("../controllers");
  
  const express = require("express");
  
  const router = express.Router();
  
  router.get("/", get);
  
  router.get("/:contactId", getOne);
  
  router.delete("/:contactId", remove);
  
  router.post("/", add);
  
  router.put("/:contactId", update);
  
  router.patch("/:contactId/favorite", updateStatus);
  
  module.exports = router;