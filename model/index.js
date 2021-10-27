const Contact = require("../utils/contactSchema")

const listContacts = async (req, res, next) => {
  try {
    const selectContact = await Contact.find({})
    console.log(`selectContact: ${selectContact}`)
    res.json({
      status: "success",
      code: 200,
      data: {
        result: selectContact,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400
    }
    next(error)
  }
}

const getContactById = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const selectContact = await Contact.find({ _id: contactId })
    console.log(`selectContact: ${selectContact}`)
    res.json({
      status: "success",
      code: 200,
      data: {
        result: selectContact,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400
    }
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const selectContact = await Contact.findByIdAndRemove({ _id: contactId })
    console.log(`selectContact: ${selectContact}`)
    res.status(200).json({
      status: "success",
      code: "200",
      message: "Removed",
      data: {
        removedContact: selectContact,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400
    }
    next(error)
  }
}

const addContact = async (req, res, next) => {
  const { body } = req

  try {
    const newContact = await Contact.create(body)
    console.log(`newContact: ${newContact}`)

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400
    }
    next(error)
  }
}

const updateContact = async (req, res, next) => {
  const { contactId } = req.params
  const { body } = req

  try {
    const newContact = await Contact.findByIdAndUpdate(contactId, body)
    console.log(`newContact: ${newContact}`)

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400
    }
    next(error)
  }
}

const updateFavorite = async (req, res, next) => {
   const { contactId } = req.params
  const { body } = req

  try {
    const newContact = await Contact.findByIdAndUpdate(contactId, body)
    console.log(`newContact: ${newContact}`)

    if(!body){
      res.status(400).json({
      status: "error",
      code: 400,
     message:  "missing field favorite"
    })
    }

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContact,
      },
    })
  } catch (error) {
    if (error.code === 11000) {
      error.code = 400
    }
    next(error)
  }
 }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
}
