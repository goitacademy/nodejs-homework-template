const Contacts = require("../../models/contactsSchema");
const validate = require("../../validator/ownValidate")
const chengOfPart= async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

  try {
    validate(req.body);
    // const contactById = await getContactById(contactId)
   
      if (!Object.prototype.hasOwnProperty.call(req.body, 'favorite')) {
        res.status(400).json({
          status: 'Bad Request',
          code: 400,
          message: 'missing field favorite',
        });
      } else {
        const contact = await Contacts.findByIdAndUpdate(
          contactId,
          { favorite },
          { new: true },
        );
        res.json({
          status: 'success',
          code: 200,
          message: 'contact status updated',
          data: contact,
        });
      }
    }
   catch (e) {
    console.error(e)
    next(e)
  }
     }
     module.exports=chengOfPart;