const { Contact } = require('../../models/contacts');

const getContactById = async (req, res) => {

    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ "message": "Not found" });
    };
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      },
    });
 
  
}

module.exports = getContactById