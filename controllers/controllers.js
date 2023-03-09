const contactsModel = require('../models/contact')

const getContacts = async (req, res) => {
    const contacts = await contactsModel.listContacts();
    res.status(200).json(contacts);
}

const getContact = async (req, res) => {
    const { contactId } = req.params;
    console.log(contactId);
  try {
    const result = await contactsModel.getContactById(contactId);
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
};

const createContact = async (req, res) => {
    const { name, email, phone } = req.body;
    console.log(name, email, phone);
    const id =  await contactsModel.addContact(name, email, phone);
    console.log(id);
    res.status(201).json(await contactsModel.getContactById(id));
  };

  const deleteContact =  async (req, res) => {
    const { contactId } = req.params;
    const isSuccess = await contactsModel.removeContact(contactId);
    isSuccess ? res.status(200).json("Contact deleted") : res.status(404).json("Not found!")
  };

const updateContact =async (req, res) => {
    const { contactId } = req.params;
  try {
    const result = await contactsModel.updateContact(contactId, req.body)
    if (result) {
      res.json({
        status: 'success',
        code: 200,
        data: { task: result },
      })
    } else {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task id: ${contactId}`,
        data: 'Not Found',
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}
const updateStatus = async (req, res, next) => {
    console.log('Proper patch');
    const { contactId } = req.params;
    const { favorite = false } = req.body;
    if (req.body.length === 0) {
        res.json ({
            status:error,
            code:400,
            message : "Missing field favorite"
        })
    }
    try{
        const result = await contactsModel.updateContact(contactId, {favorite});
        if (result) {
            res.json({
              status: 'success',
              code: 200,
              data: { status: result },
            })
          } else {
            res.status(404).json({
              status: 'error',
              code: 404,
              message: `Not found id: ${contactId}`,
              data: 'Not Found',
            })
          }
        } catch (e) {
          console.error(e)
          next(e)
        }
    }

  module.exports={getContacts, getContact, createContact, deleteContact, updateContact, updateStatus}