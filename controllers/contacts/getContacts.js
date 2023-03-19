const service = require("../../service/index")

const getContacts = async (req, res) => {
    try {
      const contacts = await service.getAllContacts()
      console.log(contacts)
    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    }) 
  } catch (e) {
    console.error(e)
  }
}
const getContactsById = async (req, res) => {
  console.log(req.params)
  try {
    const { contactId }  = req.params
  if (!contactId) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Invalid contact ID',
    })
  }
    const contact = await service.getContactById(contactId)
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Contact not found',
      })
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        contact,
      },
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal server error',
    })
  }
}
module.exports={
    getContacts,
    getContactsById,
}