const Contacts = require('./ContactsDB')

const listContacts = async (req, res, next) => {
  try{
    const contactsList = await Contacts.find()
    res.json(contactsList)
  }catch(error){
    next(error)
  }
}

const getContactById = async (req, res, next)  => {
  console.log(req.params.contactId)
  try{
    const contact = await Contacts.findById({_id: req.params.contactId})
    if(contact){
      res.json(contact)
    }else{
      next()
    }
  }catch(error){
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { name, email, phone } =req.body

  try{
    const contact = await Contacts.create({ name, email, phone })
      res.status(201).json(contact)
  }catch(error){
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const {contactId}= req.params

  try{
    const contact = await Contacts.findByIdAndDelete(contactId)
    if(contact){
      res.json(contact)
    }else{
      next()
    }
  }catch(error){
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  console.log(req.body)
  const { name, email, phone } =req.body
  const {contactId}= req.params

  try{
    const contact = await Contacts.findByIdAndUpdate(contactId, { name, email, phone }, {new:true, runValidators:true})
    if(contact){
      res.json(contact)
    }else{
      next()
    }
  }catch(error){
    next(error)
  }

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
