const {
    updateContact
  } = require("../../services/contactServices");


const updateContactById = async (req, res) => {
    await updateContact(req.params.contactId, req.body);
  
    res.json({
      message: `Contact: '${req.body.name}' successfuly updated`,
    });
};


module.exports = updateContactById;