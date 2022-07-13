const { Contact } = require('../../models/contacts');


const addContact = async (req, res) => {
  const{_id} = req.user
  const contact = await Contact.create({ ...req.body,owner:_id });
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        contact
      },
    });
  
 
}

module.exports = addContact