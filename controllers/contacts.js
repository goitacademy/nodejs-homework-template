const Contacts = require('../repository/contactsDB')
const { sendSuccessRes } = require('../helpers/sendSuccessRes')

// const getContacts = async (req, res, next) => {
//   try {
//     // console.log(req.method)
//     const allContacts = await Contacts.listContacts()
//     return sendSuccessRes(res, { allContacts })
//   } catch (error) {
//     next(error)
//   }
// }


const getContactById = async (req, res, next) => {
  const {_id} = req.user
  try {
    const contact = await Contacts.getContactById(req.params.contactId, _id)
    if (contact) {
      return sendSuccessRes(res, { contact })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found contact' })
  } catch (error) {
    next(error)
  }
}


const addContact = async (req, res, next) => {
  const {_id} = req.user
  try {
    const contact = await Contacts.addContact({...req.body, owner: _id})
    sendSuccessRes(res, { contact }, 201)
  } catch (error) {
    next(error)
  }
}

const getContactsByUser = async (req, res, next) => {
  const {_id} = req.user
  try {
    // console.log(req.method)
    const allUserContacts = await Contacts.getContactsByUser(_id)
    return sendSuccessRes(res, { allUserContacts })
  } catch (error) {
    next(error)
  }
}


const deleteContact = async (req, res, next) => {
  const {_id} = req.user
    try {
    const contact = await Contacts.removeContact(req.params.contactId, _id)
    if (contact) {
      return sendSuccessRes(res, { contact })
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found contact' })
  } catch (error) {
    next(error)
  }
}


const updateContact = async (req, res, next) => {
  const {_id} = req.user
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body, _id)
      if (contact) {
        return sendSuccessRes(res, { contact })
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not Found contact' })
    } catch (error) {
      next(error)
    }
}


const updateStatusContact = async (req, res, next) => {
  const {_id} = req.user
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body, _id)
      if (contact) {
        return sendSuccessRes(res, { contact })
      }
      return res
        .status(404)
        .json({ status: 'error', code: 404, message: 'Not Found contact' })
    } catch (error) {
      next(error)
    }
}

module.exports = {
    getContactById,
    addContact,
    deleteContact,
    updateContact,
    updateStatusContact,
    getContactsByUser,
}