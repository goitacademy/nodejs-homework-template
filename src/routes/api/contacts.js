const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContById,
  addCont,
  deleteCont,
  updateCont,
} = require("../../controllers/controllers");


const { addSchema, updateSchema } = require("../../middleware/middleware");

router.get("/", getContacts);

router.get("/:contactId", getContById);

router.post("/", addSchema, addCont);

router.delete("/:contactId", deleteCont);

router.put("/:contactId", updateSchema, updateCont);

module.exports = router;
