const contacts = require("../../models/contacts");
async function getContacts(req, res, next) {
    
       const result = await contacts.listContacts();
       res.json(result);
   
}
module.exports = getContacts;