const {
    updateContactStatus
  } = require("../../services/contactServices");



const updateStatusContact = async (req, res) => {
    const result = await updateContactStatus(req.params.contactId, req.body);
  
    res.json(result);
};


module.exports = updateStatusContact;