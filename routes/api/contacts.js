const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
  updateStatusById,
} = require("../../controllers/controllers");
const validationBody = require("../../middleware/validationBody");
const schema = require("../../schema/schema");

const router = express.Router();

router.get("/", tryCatchWrapper(getAll));
router.get("/:id", tryCatchWrapper(getById));
router.delete("/:id", tryCatchWrapper(deleteById));
router.patch("/:id/favorite", tryCatchWrapper(updateStatusById));
router.post("/", validationBody(schema.schemaPOST), tryCatchWrapper(create));
router.put(
  "/:id",
  validationBody(schema.schemaPUT),
  tryCatchWrapper(updateById)
);

module.exports = router;
