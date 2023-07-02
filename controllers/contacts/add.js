const { contact }  = require('../../models');
const { HttpError } = require('../../helpers');
const { contactSchemes } = require('../../schemes');
const { Contact } = contact;

const add = async (req, res, next) => {
    const { value, error } = contactSchemes.contactsScheme.validate(req.body);
    if(error){
      throw HttpError({status: 400, message:"missing required name field"});
    }
    const resolt = await Contact.create(value);
    res.json(resolt); 
}

module.exports = add;