const {Contact} = require('../../models/contact')
const { createError } = require('../../helpers');

const getContactById = async (req, res) => {
   const { id } = req.params;
   const result = await Contact.findById(id, "-createdAt -updateAt");
   if (!result) {
      throw createError(404)
   }
   res.json(result);
}

module.exports = getContactById;