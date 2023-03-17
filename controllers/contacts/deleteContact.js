const contactsModel = require('../../models/contact')

const deleteContact =  async (req, res) => {
    const { contactId } = req.params;
    const isSuccess = await contactsModel.removeContact(contactId);
    isSuccess ? res.status(200).json("Contact deleted") : res.status(404).json("Not found!")
  };

  module.exports = {deleteContact};