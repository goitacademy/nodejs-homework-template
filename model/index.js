// const fs = require("fs").promises
const uniqid = require("uniqid")
const contacts = require("../model/contacts.json")
const contactSchema = require("../utils/contactSchema")

const listContacts = (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  console.log(contactId)
  const selectContact = contacts.find((contact) => {
    console.log(contact.id)
    return contact.id === Number(contactId)
  })
  console.log(selectContact)
  if (!selectContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    })
    return
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: selectContact,
    },
  })
}

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const selectContact = contacts.find((contact) => contact.id === Number(contactId))
  const updatedContacts = contacts.filter((contact) => contact.id !== Number(contactId))
  // console.log(updatedContacts)

  if (!selectContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    })
  }
  res.status(200).json({
    status: "success",
    code: "200",
    message: "Removed",
    data: {
      removedContact: selectContact,
      updatedContacts,
    },
  })
}

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body)

  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    })
  }
  const newContact = {
    ...req.body,
    id: uniqid(),
  }
  console.log(newContact)
  contacts.push(newContact)

  res.status(201).json({
    status: "success",
    code: 201,

    data: {
      result: newContact,
      updatedContacts: contacts,
    },
  })
}

const updateContact = async (req, res) => {
  const { contactId } = req.params
  const selectIndex = contacts.findIndex((contact) => contact.id === Number(contactId)
    
  if (selectIndex === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Contact not found",
    })
  }

  contacts[selectIndex] = {
    ...contacts[selectIndex],
    ...req.body,
    id: uniqid(),
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      updatedContacts: contacts,
    },
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
