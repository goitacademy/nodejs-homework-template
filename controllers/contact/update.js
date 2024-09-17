const Contacts = require('../../models/contact/contactsSchema')

const update = async (req, res, next) => {
  try {
    
    const { phone, email, name } = req.body;
 if (!phone || !email || !name) {
      return res.status(400).json({
        "message": "missing fields"
      });
    }

    const { contactId } = req.params;

    const updatedUser = await Contacts.findByIdAndUpdate(contactId, req.body, { new: true });

    res.status(200).json({
    updatedUser,
    });
  } catch (err) {
   next(err);
}
}

module.exports = update;