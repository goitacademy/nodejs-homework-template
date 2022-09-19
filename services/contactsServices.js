const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../models/contacts')
const { v4: uuid } = require('uuid');

const getAll = async () => {
    try {
        const data = await listContacts()
        return data
    } catch (error) {
        console.log(error.message);
}
}

const getById = async (id) => {
    try {
        const data = await getContactById(id)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const createNew = async (contact) => {
    try {
        const id = uuid()
        const data = await addContact({id, ...contact})
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const deleteById = async (id) => {
    try {
        const result = await removeContact(id)
        return result
    } catch (error) {
        console.log(error.message);
    }
}

const updateById = async (id, update) => {
    try {
        const data = await updateContact(id, update)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {getAll, getById, createNew, deleteById, updateById}