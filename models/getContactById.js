const {getAllContacts} = require('../utils');

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contacts=await getAllContacts();  
  const result = contacts.find(item => item.id === contactId);
    if (!result) {
        res.status(404).json({
        status: "error",
            code: 404,
        mesage:`Contact with id= ${contactId} not found`
    })
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result: result
        }
    })  
}

module.exports = getContactById;