const Contact = require('./schemas/contact')

const getAllContacts = async () => {
    try {
        return await Contact.find().select('-__v');
    } catch (err) {
        console.log(err);
    }
}

const getById = (contactId) => {
  return Contact.findOne({ _id: contactId }).select('-__v');
}

const createContact = (body) => {
  return Contact.create(body)
}

const updateContact = (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId}, body, { new: true })
}

const removeContact = (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId })
}

const updateStatus = (contactId, favorite ) => {
    return Contact.findByIdAndUpdate({ _id: contactId}, { favorite }, { new: true })
}

module.exports = {
  getAllContacts,
  getById,
  createContact,
  updateContact,
  removeContact,
  updateStatus,
}