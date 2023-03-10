const express = require("express");

const router = express.Router();

const asyncHandler = require("express-async-handler");

const {
  getAllConts,
  getContById,
  createContact,
  delContact,
  updateCont,
  updateStatus,
} = require("../../controllers/contacts/index");

router.get("/contacts", asyncHandler(getAllConts));

router.get("/contacts/:id", asyncHandler(getContById));

router.post("/contacts", asyncHandler(createContact));

router.delete("/contacts/:id", asyncHandler(delContact));

router.put("/contacts/:id", asyncHandler(updateCont));

router.patch("/contacts/:contactId/favorite", asyncHandler(updateStatus));

module.exports = router;
