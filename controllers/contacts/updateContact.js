const { Contact } = require('../../models')

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true})
  
  if (!result) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id= ${contactId} not found`
    })
  }
  
  res.json({
    status: "success",
    code: 200,
    message: `Contact with id= ${contactId} update`,
    data: {
      result
    }
  })
}

module.exports = updateContact;