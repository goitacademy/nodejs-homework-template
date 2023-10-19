const Contact = require('../../models/contacts')
const requestError = require('../../helpers/requestError')

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
    if (!result) {
      throw requestError(404);
    }
    res.status(200).json(result)
}

module.exports = getContactById