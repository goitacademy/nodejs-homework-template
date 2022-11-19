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
const { schemaPUT, schemaPOST, schemaPATCH } = require("../../schema/schema");
const { auth } = require("../../middleware/auth");

const router = express.Router();

router.get("/", tryCatchWrapper(auth), tryCatchWrapper(getAll));
router.get("/:id", tryCatchWrapper(auth), tryCatchWrapper(getById));
router.delete("/:id", tryCatchWrapper(auth), tryCatchWrapper(deleteById));
router.patch(
  "/:id/favorite",
  validationBody(schemaPATCH),
  tryCatchWrapper(auth),
  tryCatchWrapper(updateStatusById)
);
router.post(
  "/",
  validationBody(schemaPOST),
  tryCatchWrapper(auth),
  tryCatchWrapper(create)
);
router.put(
  "/:id",
  validationBody(schemaPUT),
  tryCatchWrapper(auth),
  tryCatchWrapper(updateById)
);

module.exports = router;
