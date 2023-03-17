const service = require("../service")
const { contactValidate } = require("../utils/contactValidator")
const getContacts = async (req, res) => {
    try {
    const contacts = await service.getAllContacts()
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
const getContactById = async (req, res) => {
   const { contactId }  = req.params
  try {
    const contact = await service.getContactById(contactId)
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
const createContact = async (req, res) => {
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

const updateContact = async (req, res) => {
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
    const updated = await service.updateContact(contactId, value)
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

const deleteContact = async (req, res) => {
   const { contactId } = req.params;
  try {
    const contacts = await service.removeContact(contactId)
    contacts.filter(contact => contact.id !== contactId) ?  
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
const updateStatusContact = async (req, res) => {
  const { id } = req.params
  const { favorite } = req.body
    
    if (!favorite) {
        return res.status(400).json({
            status: "error",
            code: 400,
            message: "missing field favourite"
        });
    }
  try {
    const result = await service.updateContact(id, { favorite })
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
        message: `Not found task id: ${id}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    
  }
}
module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateStatusContact
}