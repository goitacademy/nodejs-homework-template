const {NotFound} = require("http-errors");

const {sendSuccessRes} = require("../helpers");
const {Contact} = require{'../models'}

const listContacts = async (req, res) => {
      const result = await Contact.find({}, '_id name email phone code active')
      sendSuccessRes(res , {result})
    }

const getContactById = async (req, res) => {
      const {contactId } = req.params
      const result = await Contact.findById({contactId, '_id name email phone code active'})
      if(!result){
        throw new NotFound(`Contact with id=${contactId} not found`);
      }
      sendSuccessRes(res, {result})
    }

const addContact = async (req, res) => {
      const result = await Contact.create(req.body)
      sendSuccessRes(res, {result}, 201)
    }

const updateContacts =  async (req, res) => {
    const {contactId} = req.params
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if(!result){
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    sendSuccessRes(res, {result});
  }

  const updateStatusContact =  async (req, res) => {
    const {contactId} = req.params
    const {favorite} = req.body
    const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true})
    if(!result){
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    sendSuccessRes(res, {result});
  }

const removeContact = async (req, res) => {
      const {contactId} = req.params
      const result = await Contact.findByIdAndDelete(contactId)
      if(!result){
      throw new NotFound(`Contact with id=${contactId} not found`)
      }   
      sendSuccessRes(res, {message: "Success delete"});
    }

    module.exports = {
        listContacts,
        getContactById,
        addContact,
        updateContacts,
        removeContact,
        updateStatusContact
    }