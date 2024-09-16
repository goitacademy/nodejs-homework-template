const getAll=require('./contacts/getAll')
const getById=require('./contacts/getById')
const addContact=require('./contacts/addContact')
const deleteById=require('./contacts/deleteById')
const updateById=require('./contacts/updateById')

module.exports={
    getAll,
    getById,
    addContact,
    deleteById,
    updateById
}