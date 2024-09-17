const { createContactsDataValidator, updateContactsDataValidator, updateFavoriteContactsDataValidator } = require('../../utils/contactValidator');
const Contacts = require('../../models/contact/contactsSchema');

exports.checkCreateContactsData = async (req, res, next) => {
    try {
          const { error, value } = createContactsDataValidator(req.body); 

        if (error) {
  return res.status(400).json({ message: error.details[0].message})
}


const userExists = await Contacts.exists({ name: value.name });
if (userExists) {
return res.status(409).json({ message: 'User with this name already exists..' });
        }

  req.body = value;

  next();
    } catch (err) {
         next(err); 
    }
};

exports.checkUpdateContactsData = async (req, res, next) => {
    try {
          const { error, value } = updateContactsDataValidator(req.body); 

        if (error) {
  return res.status(400).json({ message: error.details[0].message})
}

const userExists = await Contacts.exists({ name: value.name });
if (userExists) {
return res.status(409).json({ message: 'User with this name already exists..' });
        }
        
  req.body = value;
  next();
    } catch (err) {
         next(err); 
    }
};

exports.checkUpdateFavoriteContactsData = async (req, res, next) => {
    try {
          const { error, value } = updateFavoriteContactsDataValidator(req.body); 

        if (error) {
  return res.status(400).json({ message: error.details[0].message})
}
      
  req.body = value;
  next();
    } catch (err) {
         next(err); 
    }
};