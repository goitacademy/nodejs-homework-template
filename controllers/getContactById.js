const contacts = require('../models/contacts');

const { createError } = require('../helpers');

const getContactById = async (req, res) => {
   const { id } = req.params;
   const result = await contacts.getContactById(id);
   if (!result) {
      throw createError(404)
   }
   res.json(result);
}

module.exports = getContactById;