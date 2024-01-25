import {listContacts} from '../handlers.js'

async function indexContacts(req, res, next) {
    const contacts = listContacts();  
    return res.json(contacts).status(200); 
}

export { indexContacts };