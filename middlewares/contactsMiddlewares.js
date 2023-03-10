const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve(__dirname, "contacts.json");

exports.checkContactData = (req, res, next) => {
    
    next();
};

exports.checkContactId = async (req, res, next) => {
    try {
            const { contactId } = req.params;

      if (contactId.length < 10) {
        const error = new Error('Invalid contact Id..')
        error.status = 400;
        return next(error);
      };
      
      const contacts = JSON.parse(await fs.readFile(contactsPath));
      const contact = contacts.find(item => item.id === contactId); 

      if (contact) return next();

        const error = new Error('No contact..');
          error.status = 404;
      next(error);
      
    } catch (err) {
    res.status(500).json({
      msg: err.msg,
    });
  }

};