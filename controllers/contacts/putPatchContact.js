const service = require("../../service/index")
const { contactValidate } = require("../../utils/contactValidator")

export const updateContactById = async (req, res) => {
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


export const updatedStatusContact = async (req, res) => {
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