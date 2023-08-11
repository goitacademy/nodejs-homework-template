const getAll=require('./contacts/getAll')
const getById=require('./contacts/getById')
const addContact=require('./contacts/addContact')
const deleteById=require('./contacts/deleteById')
const updateById=require('./contacts/updateById')
const updateStatusContact =require ('./contacts/updateStatusContact')

module.exports={
    getAll,
    getById,
    addContact,
    deleteById,
    updateById,
    updateStatusContact
}