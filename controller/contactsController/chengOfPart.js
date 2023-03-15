//  const validate = require("../../validator/ownValidate")
const chengOfPartContactServices=require('../../services/contactServices/chengOfPartContactServices')
const {putchContactsValidationJoi}=require('../../middlewares/validator')

const chengOfPart= async (req, res, next) => {
    const {contactId } = req.params;
    const { favorite } = req.body;
console.log('req.body',req.body)
  try {
     putchContactsValidationJoi(req.body)
    // validate(req.body);
      if (!Object.prototype.hasOwnProperty.call(req.body, 'favorite')) {
        res.status(400).json({
          status: 'Bad Request',
          code: 400,
          message: 'missing field favorite',
        });
      } 
      if (!favorite) {
        res.json({
          message: 'Missing field favorite!'   
        });
      }
      const result = await chengOfPartContactServices(contactId,favorite)

        res.json({
          status: 'success',
          code: 200,
          message: 'contact status updated',
          data: result,
        });
      
    }
   catch (e) {
    console.error(e)
    next(e)
  }
     }
     module.exports=chengOfPart;