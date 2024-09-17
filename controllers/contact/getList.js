const Contacts = require('../../models/contact/contactsSchema')

const getList = async (req, res, next) => {
  try {
   
    const contacts = await Contacts.find();

if (contacts.length === 0) return res.status(404).json({ "message": "Not found" });
  
    res.status(200).json({
    contacts,
  });
} catch (err) {
    next(err);
}
}

module.exports = getList;

