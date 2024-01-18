
const handler = require('../handlers')

async function indexContacts(req, res, next) {
    const contacts = handler.listContacts();  
    return res.json(contacts).status(200); 
}

module.exports = indexContacts;