const { getContactById } = require("../models");

const getContactByIdController = async (req, res) => {
    const {contactId: id} = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    res.status(200).json(contact);
  };

  module.exports = getContactByIdController;