const {
    listContacts,
    getContactById
} = require("../models/contacts")

exports.getContacts = async (req, res) => {
    try {
    const contacts = await listContacts()
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts
      }
  })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
}
exports.getContactById = async (req, res) => {
   const { contactId }  = req.params
  try {
    const contact = await getContactById(contactId)
    contact ?
      res.json({
        status: "success",
        code: 200,
        data: {
          contact
        }
      })
      :
      res.json({
        code: 404,
        message: "Not Found"
      })
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  } 
}