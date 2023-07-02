const { contact } = require('../../models');
const { HttpError } = require('../../helpers');

const getById = async (req, res, next) => {
    const { contactId } = req.params;
    const resolt = await contact.findById(contactId);
    if(!resolt){
      throw HttpError({status: 400, message:"Not found"});
    }
    res.json(resolt);
}

module.exports = getById;