const { addNewContact } = require('../../modules/contacts');


const addContact = async(req, res, next) => {
  try {
      const newContact = await addNewContact(req.body);
      res.json({
        status: "success",
          code: 201,
          message: "New contact created",
        data: {
          result: newContact
        }
      });
    } catch (error) {
      next(error)
  }
}
module.exports = addContact;
