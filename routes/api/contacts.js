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

const bodyValidator = require("../../middleWares/bodyValidator");
const addValidator =  require("../../middleWares/addValidator");
const { addSchema, changeSchema } = require("../../schemas/schema");

router.get('/', getAllContacts);

router.get('/:contactId', getById);

router.post('/', addContact, addValidator(addSchema));

router.delete('/:contactId', deleteById);

router.put('/:contactId', updateById, bodyValidator(changeSchema));

module.exports = router;
