const getAll=require('./getAll')
const getById=require('./getById')
const addContact=require('./addContact')
const deleteById=require('./deleteById')
const updateById=require('./updateById')
const updateStatusContact =require ('./updateStatusContact')

module.exports={
    getAll,
    getById,
    addContact,
    deleteById,
    updateById,
    updateStatusContact
}