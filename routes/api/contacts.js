const express = require('express')
const contacts = require('../../models/contacts.js')
const router = express.Router()



router.get('/', async (req, res, next) => {
  contacts.listContacts().then(
    (contacts)=> {
      res.status(200).json({ message: contacts })
    }
  )
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  contacts.getContactById(contactId).then(
    (contact)=> {
      (contact.length === 1)
        ? res.status(200).json({ message: contact })
        : res.status(404).json({ message: 'Not found' })
    }
  )
})

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body;
  (name=== undefined || email===undefined || phone===undefined)
    ? res.status(400).json({message: "missing fields"})
    : contacts.addContact(name, email, phone).then(
      (result)=> {
        result.validationPass
        ? res.status(200).json({ message: result.newContact })
        : res.status(400).json({message: result})
      }
    )
})

router.delete('/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    contacts.removeContact(contactId).then(
      (result)=> {
        result.removeDone
        ? res.status(200).json({ message: "Contact deleted!" })
        : res.status(404).json({ message: 'Not found' })
      }
    )      
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone} = req.body;
  (name=== undefined || email===undefined || phone===undefined)
    ? res.status(400).json({message: "missing fields"})
    : contacts.updateContact(contactId, name, email, phone).then(
        (result)=> {
          (result.validationPass === false)
            ? res.status(404).json({ message: result.message })
            : (result.updatedDone ===false)
              ?res.status(404).json({ message: 'Not found' })
              :res.status(202).json({ message: result.updatedContact})
        }
      )
})

module.exports = router
// http://localhost:3000/api/contacts/rsKkOQUi80UsgVPCcLZZW
// {
//   "name": "sss",
//   "email": "sss",
//   "phone": "sss"
// }


// mongodb+srv://TEST_USER:Test_User@db-contacts.hmcyp.mongodb.net/?retryWrites=true&w=majority&appName=db-contacts