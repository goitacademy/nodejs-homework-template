const { Contact } = require('../../models/contacts')


const updateStatusContact = async (req, res) => {

    
    const { contactId } = req.params;
    const { favorite } = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId, {favorite}, { new: true });
    if (!contact) {
      return res.status(404).json({ "message": "Not found" });
    };
    
    res.json({
      status: 'success',
      code: 200,
      data: {
        contact
      }

    })
}
module.exports = updateStatusContact