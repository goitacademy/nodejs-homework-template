
const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/controllers.js');
const { validateBody } = require('../../schemas/contactSchema.js');

router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/", validateBody(controllers.contactSchema), controllers.add);

router.put("/:id", validateBody(controllers.contactSchema), controllers.updateById);

router.delete("/:id", controllers.deleteById);

module.exports = {
  router
};
