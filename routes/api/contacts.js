import {Router} from "express";
import model from '../../model/index.js';
import {validateCreate, validateUpdte, validateId} from './validation.js';
const router = new Router();

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
})

router.get('/:id',validateId,  async (req, res, next) =>{
  const {id} = req.params;
  const contact = await model.getContactById(id)
  if (contact) {
   return res.status(200).json(contact);
  }
  res.status(404).json({message: `not found contact id = ${id}`})
});

router.post('/', validateCreate, async (req, res, next) => {
  if (req.body.name && req.body.email && req.body.phone) {
    const newContact = await model.addContact(req.body)
    return  res.status(201).json(newContact);
  }
  res.status(404).json({message: "missing required name field"})
 
})

router.delete('/:id',validateId,  async (req, res, next) => {
  const {id} = req.params;
  const contact = await model.removeContact(id)
  if (contact) {
      return res.status(200).json({message: `contact with id = ${id} is deleted`});
  }
  res.status(404).json({message: `not found contact id = ${id}`})
})

router.patch('/:id', validateUpdte, validateId, async (req, res, next) => {
  const {id} = req.params;
  const body = req.body
  const updataContact = await model.updateContact(id, body)
  if (updataContact) {
    const contact = await model.getContactById(id)
      if (contact) {
           return res.status(200).json(contact);
     }
  }
  res.status(404).json({message: `not found contact id = ${id}`})
})

export default router
