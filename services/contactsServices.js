const Contact = require('../models/contact')

const getAll = async () => {
    try {
        const data = await Contact.find()
        return data
    } catch (error) {
        console.log(error.message);
}
}

const getById = async (id) => {
    try {
        const data = await Contact.findOne({_id: id})
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const createNew = async (contact) => {
    try {
        const data = await Contact.create(contact)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

const deleteById = async (id) => {
    try {
        const result = await Contact(id)
        return result
    } catch (error) {
        console.log(error.message);
    }
}

const updateById = async (id, update) => {
    try {
        const data = await Contact(id, update)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {getAll, getById, createNew, deleteById, updateById}