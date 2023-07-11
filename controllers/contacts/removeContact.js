const fs = require('fs/promises');
const Contact = require('../../models/contacts/contacts');

const removeContact = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Contact.findByIdAndRemove(id);
    const contactsList = await Contact.find();
    if (!item) {
      return res.status(404).json({ "message": "Not found" })
    }
    return res.status(200).json({ "message": "contact deleted", contactsList });
    } catch (err) {
        res.status(400).json({ message: 'Ooops...'})
    }
}

module.exports = {
    removeContact
}