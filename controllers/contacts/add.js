const { contact } = require('../../models');
const { HttpError } = require('../../helpers');
const { contactsScheme } = require('../../schemes');

const add = async (req, res, next) => {
    const { value, error } = contactsScheme.validate(req.body);
    if(error){
      throw HttpError({status: 400, message:"missing required name field"});
    }
    const resolt = await contact.create(value);
    res.json(resolt); 
}

module.exports = add;