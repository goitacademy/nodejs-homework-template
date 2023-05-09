const express = require("express");
const router = express.Router();
//const cntrlContacts = require("../../controllers/contacts");
//const { validateBody, validateFavorite } = require("../../middlewares");
//const { addSchema, updateSchema, updateFavoriteSchema } = require("../../schemas");
//const { isValidId } = require("../../middlewares");
const { registrationSchema } = require("../../schemas/users.js");
router.post('/register', registrationSchema);
module.exports = router;
