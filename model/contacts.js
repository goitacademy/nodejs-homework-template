const Contact = require('./shemas/contacts')

const listContacts = async (userId, qery) => {
  const results = await Contact.find({owner: userId}).populate({
    path: 'owner',
    select: 'name, email, phone, favorite '
  })
 return results
}

const getContactById = async (userId, id) => {
 const result = await Contact.findOne({_id: id, owner: userId}).populate({
  path: 'owner',
  select: 'name, email, phone, favorite '
})
 return result
}

const removeContact = async (userId, id) => {
    const result = await Contact.findByIdAndRemove({_id: id, owner: userId})
 return result
}

const addContact = async (userId, body) => {
    const result = await Contact.create({...body, owner: userId})
 return result
}

const updateContact = async (userId, id, body) => {
  const result = await Contact.findByIdAndUpdate(
    {_id: id, owner: userId},
    {...body}, 
    {new: true}
    )
  return result
}

const updateStatusContact = async (userId, id, body) => {
  const result = await Contact.findByIdAndUpdate(
    {_id: id, owner: userId},
    {...body}, 
    {new: true}
    )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
}
