const { Contact } = require('../models')

const getAll = () => {
  return Contact.find({})
}

const getById = async (id) => {
  try {
    return await Contact.findById(id)
  } catch (error) {
    console.log(error.message)
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

const add = (newContact) => {
  return Contact.create(newContact)
}

const remove = async (id) => {
  try {
    return await Contact.findByIdAndRemove(id)
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

const update = async (id, updateContact) => {
  try {
    return await Contact.findByIdAndUpdate(
      id,
      { ...updateContact },
      { new: true }
    )
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

const updateStatusContact = async (id, updateContact) => {
  try {
    return await Contact.findByIdAndUpdate(
      id,
      { ...updateContact },
      { new: true }
    )
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) return null
    throw error
  }
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
  updateStatusContact
}
