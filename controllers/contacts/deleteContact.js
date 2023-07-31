const {
    deleteContactById
  } = require("../../services/contactServices");


const deleteContact = async (req, res) => {
    await deleteContactById(req.params.contactId);
  
    res.json({
      message: `Delete contact success`,
    });
};

module.exports = deleteContact;