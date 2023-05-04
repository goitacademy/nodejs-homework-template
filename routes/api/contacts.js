const { 
  getAllContacts,
  getById,
  addContact,
  deleteById,
  updateById
} = require("../../controllers");


const cors = require('cors');
const router = require('express').Router();
const bodyParser = require('body-parser');

router.use(cors());
router.use(bodyParser.json());

const bodyValidator = require("../../middle/bodyValidator");
const addValidator =  require("../../middle/addValidator");
const { addSchema, changeSchema } = require("../../schemas/schema");

router.get('/', getAllContacts);

router.get('/:contactId', getById);

router.post('/', addValidator(addSchema), addContact);

router.delete('/:contactId', deleteById);

router.put('/:contactId', bodyValidator(changeSchema), updateById);

module.exports = router;
