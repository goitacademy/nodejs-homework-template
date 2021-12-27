import repositoryContacts from '../../repository/contacts'

const getContacts = ('/', async (req, res, next) => {
    const contacts = await repositoryContacts.listContacts()
    res.status(200).json(contacts)
  })

const getContactById = async (req, res, next) => {
    const {id} = req.params
    const contact = await repositoryContacts.getContactById(id)
    console.log(contact)
     if (contact) {
       return res.status(200).json(contact)
     }
     res.status(404).json({ message: `Not found contact with id: ${id}` })
}

const addContact = async (req, res, next) => {
    const newContact = await repositoryContacts.addContact(req.body)
    res.status(201).json(newContact)
}

const removeContact = async (req, res, next) => {
    const {id} = req.params
    const contact = await repositoryContacts.removeContact(id)
     if (contact) {
       return res.status(200).json({message: "Contact deleted"})
      }
     res.status(404).json({ message: `Couldn't delete this contact, because it NOT FOUND` })
}

const updateContact = async (req, res, next) => {
    const {id} = req.params
    const contact = await repositoryContacts.updateContact(id, req.body)
    if (contact) {
      return res.status(200).json(contact)
    }
    res.status(404).json({ message: `Not found contact with id: ${id}` })
}

export {getContacts,getContactById, addContact, removeContact, updateContact}
