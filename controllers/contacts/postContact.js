const service = require("../../service/index")
const { contactValidate } = require("../../utils/contactValidator")

export const createdContact = async (req, res) => {
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