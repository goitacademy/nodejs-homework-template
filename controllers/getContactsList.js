const {listContacts} = require("../models/contacts")

async function getContactsList(req, res, next) {
    const list = await listContacts();
        res.status(200).json(list);
}

module.exports = getContactsList

// async (req, res, next) => {
//     const list = await listContacts();
//     res.status(200).json(list);
  
//     res.end();
//   }