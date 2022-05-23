const { Router } = require("express");
const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
} = require("../../../controllers");
const { validateCreate, validateUpdate, validateId } = require("../middleware");

const router = Router();

router.get("/", getContacts);

router.get("/:id", validateId, getContactById);

router.post("/", validateCreate, postContact);

router.delete("/:id", validateId, deleteContact);

router.put("/:id", validateId, validateUpdate, putContact);

module.exports = router;
