
const chalk = require('chalk')
const { getAllContacts, updateContacts } = require('./methods')


const removeContact = async(contactId) =>{
    const allContacts = await getAllContacts()
    //////// first way////////
    // const filtrContact = allContacts.filter(({ id }) => id !== Number(contactId))
    // if (allContacts.length === filtrContact.length) {
    //     console.log(chalk.red('Contact with this ID not found!'));
    //     return null
    // }
    // await updateContacts(filtrContact)
    // return filtrContact

    //////// second way////////
    const indexContact = allContacts.findIndex(item => item.id === Number(contactId))
    if (indexContact === -1) {
        console.log(chalk.red('Contact with this ID not found!'));
        return null
    }
    const removeContact = allContacts.splice(indexContact, 1)
    updateContacts(allContacts)
    return removeContact
}

module.exports = removeContact