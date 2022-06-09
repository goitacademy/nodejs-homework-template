const contacts = require('../models/contacts');

const { createError } = require('../helpers');

const updateContactById = async (req, res) => {
   const { id } = req.params;
   const result = await contacts.updateContactById(id, req.body);
   if (!result) {
      throw createError(404);
   }
   res.json(result);
}

module.exports = updateContactById;