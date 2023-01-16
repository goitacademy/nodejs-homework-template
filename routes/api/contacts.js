const express = require("express");
const { auth, controllerWrapper, validation } = require("../../middlewares");
const {
  contacts: {
    getAll,
    getById,
    add,
    updateById,
    updateStatusContact,
    removeById,
  },
} = require("../../controllers");
const {
  postContactSchema,
  putContactSchema,
  patchContactSchema,
} = require("../../models/contact");

const router = express.Router();

router.get("/", auth, controllerWrapper(getAll));
router.get("/:id", controllerWrapper(getById));
router.post("/", auth, validation(postContactSchema), controllerWrapper(add));
router.put("/:id", validation(putContactSchema), controllerWrapper(updateById));
router.patch(
  "/:id/favorite",
  validation(patchContactSchema),
  controllerWrapper(updateStatusContact)
);
router.delete("/:id", controllerWrapper(removeById));

module.exports = router;
