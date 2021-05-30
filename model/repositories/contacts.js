const Contact = require('../schema/contacts')

const getAll = async () => {
  const results = await Contact.find()
  return results
}

const getById = async (id) => {
  const result = await Contact.findOne({ _id: id })
  return result
}

const remove = async (id) => {
  const result = await Contact.findOneAndRemove({ _id: id })
  return result
}

const create = async (body) => {
  const result = await Contact.create(body)
  return result
}

const update = async (id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}