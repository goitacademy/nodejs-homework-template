// const createError = require("http-errors");
// const { contactSchema } = require("../../schemas");
const { contacts: service } = require("../../services");

const updateContact = async (req, res) => {
  
  const contactId = req.params.contactId;
  const body = req.body
  // const { error } = contactSchema.validate(req.body);
    
  // if (error) {
  //   throw createError(400, "Missing required field");
  // }

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