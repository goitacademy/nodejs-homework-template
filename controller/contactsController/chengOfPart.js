const Contacts = require("../../models/contactsSchema");
const validate = require("../../validator/ownValidate")
const chengOfPart= async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

  try {
    validate(req.body);
    // const contactById = await getContactById(contactId)
    const result = await Contacts.findByIdAndUpdate({_id:contactId}, favorite, { new: true })
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { contacts: result },
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
    next(e)
  }
     }
     module.exports=chengOfPart;