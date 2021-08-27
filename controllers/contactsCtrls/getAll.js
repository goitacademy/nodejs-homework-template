const data = require('../../contactsData');

const listContacts = async (req, res, next) => {
  try {
    const contacts = await data.listContacts();
    res.json({
      contacts
    });
  } catch (error) {
    next(error);
  }

  
}

module.exports = listContacts;