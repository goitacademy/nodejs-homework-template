
const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/controllers.js');
const { validateBody, contactValidSchema, contactFavoriteSchema } = require('../../schemas/contactSchema.js');
const {isValidId}= require("../../middlewars/isValidId.js")
const {authenticate}=require("../../middlewars/authenticate.js")

router.use(authenticate);


router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/", isValidId, validateBody(contactValidSchema), controllers.add);

router.put("/:id", isValidId, validateBody(contactValidSchema), controllers.updateById);

router.delete("/:id", controllers.deleteById);

router.patch("/:id/favorite", isValidId, validateBody(contactFavoriteSchema), controllers.updateStatusContact);

module.exports =router;

