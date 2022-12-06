const contacts = require('../../models/contacts.js')
const {HttpErr} = require('../../helpers')

const getContactById = async (req, res, next) => {  
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
    
  if (!result) {
    throw HttpErr(404, "Not found");
  }

  res.json(result);
}

module.exports = getContactById;