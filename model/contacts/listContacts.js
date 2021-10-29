const { getAllContacts } = require('./methods')

const listContacts = async() =>{
 return  await getAllContacts()
}

module.exports = listContacts