const { Contact } = require('../../models/contact');

const add = async (req, res, next) => {
  try {   
      const {_id: owner} = req.user;
      const newContact = await Contact.create({ ...req.body, owner });
      
      res.json({
      status: 'success',
      code: 201,
      message: `Contact ${newContact.name} added!`,
      data: {
        result: newContact,
      },
    });
  } catch (error) {
      next(error)
 }  
}

module.exports = add