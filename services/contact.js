const { Contact } = require('../models')

const getAll = () => {
  return Contact.find({})
}

const getById = (id) => {
  return Contact.findById(id)
}

const add = (newContact) => {
  return Contact.create(newContact)
}

const remove = (id) => {
  return Contact.findByIdAndRemove(id)
}

const update = (id, updateContact) => {
  return Contact.findByIdAndUpdate(id, { ...updateContact }, { new: true })
}

const updateStatusContact = (id, updateContact) => {
  return Contact.findByIdAndUpdate(id, { ...updateContact }, { new: true })
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact
}
