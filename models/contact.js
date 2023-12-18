const Contact = require('./schemas/contacts')

const getList = async () => {
  const results = await Contact.find({})
  // console.log(results)
  return results
}

const getById = async (id) => {
  const result = await Contact.findOne({ _id: id })
  return result
}

const create = async (body) => {
  const result = await Contact.create(body)
  return result
}

const update = async (id, body) => {
  const result = await Contact.findByIdAndUpdate(
    { _id: id },
    { $set: body },
    { new: true }
  )
  return result
}

const remove = async (id) => {
  const result = await Contact.findByIdAndDelete({ _id: id })
  return result
}

module.exports = {
  getList,
  getById,
  remove,
  create,
  update
}
