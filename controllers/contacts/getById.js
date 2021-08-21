const getContactById = require("../../model/contacts/getContactById");


const getById = async (req, res, next) => {
    try {
            const {contactId} = req.params;
            const contacts = await getContactById(contactId);
            if(!contacts) {
                return res.status(404).json({
                    "message": "Not found"
                });
            }
            res.json({
              contacts
            })
        }
        catch(error){
            next(error);
        }
      }

module.exports = getById;

