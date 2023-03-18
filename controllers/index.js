const service = require("../service/index")
const { contactValidate } = require("../utils/contactValidator")

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
const createdContact = async (req, res) => {
  const { error, value } = contactValidate(req.body);

  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field"
    });
  }

  try {
    const newContact = await service.createContact(value);
    value.favorite = false
    res.json({
      code: 201,
      data: {
        newContact
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    });
  }  
}

const updateContactById = async (req, res) => {
  const { error, value } = contactValidate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field"
    });
  }
  const contactId = req.params.contactId
  try {
    const updated = await service.updateContactById(contactId, value)
    res.json({
      code: 200,
      data: {
        updated
      }
    })
  }  catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error"
    })
  }
}

const deletedContact = async (req, res) => {
   const { contactId } = req.params;
  try {
    const contacts = await service.removeContact(contactId)
    contacts ?  
      res.json({
        message: "contact deleted"
      })
      : res.json({
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
const updatedStatusContact = async (req, res) => {
  const { error, value } = contactValidate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field"
    });
  }
  const { contactId } = req.params 
    if (!value.favorite) {
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "missing field favourite"
        });
    }
  try {
    const result = await service.updateStatusContact(contactId, value)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: result,
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    
  }
}
module.exports = {
    getContacts,
    getContactsById,
    createdContact,
    updateContactById,
    deletedContact,
    updatedStatusContact
}