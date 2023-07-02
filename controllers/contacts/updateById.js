const { contact } = require('../../models');
const { HttpError } = require('../../helpers');
const { contactSchemes } = require('../../schemes');
const { Contact } = contact;

const updateById = async (req, res, next) => {
    const { contactId } = req.params;
    const { value, error } = contactSchemes.contactsScheme.validate(req.body);
    if(error){
      throw HttpError({status: 400, message:"missing fields"});
    }
    const resolt = await Contact.findByIdAndUpdate(contactId, value, { new: true });
    if(!resolt){
      throw HttpError({status: 404, message:"Not found"});
    }
    res.json(resolt);
}

module.exports = updateById;