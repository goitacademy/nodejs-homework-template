const { Contact } = require('../models')

const getAll = (filter) => {
  return Contact.find(filter)
}

const getById = (id) => {
  return Contact.findById(id)
}

const add = (newContact) => {
  return Contact.create(newContact)
}

const update = (id, body) => {
  return Contact.findByIdAndUpdate(id, body)
}

const updateStatus = (id, body) => {
  return Contact.findByIdAndUpdate(id, body)
}

const del = (id) => {
  return Contact.findByIdAndDelete(id)
}

module.exports = {
  getAll,
  getById,
  add,
  update,
  updateStatus,
  del
}
