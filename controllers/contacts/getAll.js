const { listContacts } = require('../../models/contacts');

const getAll = async (req, res, next) => {
    const contacts = await listContacts()
    
    // console.log(contacts)
    res.status(200).json({ status: "Ok", data: contacts })
}

module.exports = getAll;
