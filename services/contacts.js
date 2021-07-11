const { Contact } = require('../models')

const getAll = (filter) => {
  return Contact.find(filter)
}

const getById = (id) => {
  return Contact.findById(id)
}

const add = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone })
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
