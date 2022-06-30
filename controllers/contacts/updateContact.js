const { Contact } = require('../../models/schema');


const updateContact = async (req, res) => {
  
    
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if (!contact) {
      return res.status(404).json({ "message": "Not found" });
    };
    res.json({
      status: 'success',
      code: 200,
      data: { contact },
    });
  
}

module.exports = updateContact