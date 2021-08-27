const data = require('../../contactsData');

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    
    const contact = await data.getContactById(contactId);
    console.log(contact);

    if (!contact) {
      return res.status(404).json({
        "message": "Not found"
      })
    }
    res.json({
      contact
    })
  } catch (error) {
    next(error)
  }

  
}

module.exports = getContactById






