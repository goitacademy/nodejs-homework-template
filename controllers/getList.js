const { listContacts } = require("../models/contacts")

const getList =  async (req, res, next) => {
    const list =  await listContacts()
    res.json({ contacts: list })
   }

module.exports = getList