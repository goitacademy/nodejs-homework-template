const { contacts: service } = require("../../services");

const updateContact = async (req, res) => {
  
  const contactId = req.params.contactId;
  const body = req.body

  const result= await service.updateContact(contactId, body);
  
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result
    }
    
  });
  
    return result;
};

module.exports = updateContact;