const express = require("express");
const {
  getAll,
  getByID,
  add,
  deleteByID,
  update,
} = require("../../controllers/contacts");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas/contacts");

router.get("/", getAll);
router.get("/:contactId", getByID);
router.post("/", validateBody(addSchema), add);
router.delete("/:contactId", deleteByID);
router.put("/:contactId", validateBody(addSchema), update);

module.exports = router;
