const { removeContact } = require("../models/contacts");

const removeContactController =  async (req, res, next) => {
    const { id } = req.params
    
    removeContact(id)
    res.status(204).json({ message: 'contact deleted' })
  }

module.exports = removeContactController