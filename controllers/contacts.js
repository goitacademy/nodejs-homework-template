const path = require("path")
const fs = require("fs").promises
const { v4 } = require("uuid")
const contactSchema = require("../utils/validateContacts")

const contactsPath = path.join(__dirname, "../model/contacts.json")

const listContacts = async (req, res) => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  })
}

const getContactById = async (req, res) => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  const { contactId } = req.params
  const selectContact = contacts.find((item) => item.id === Number(contactId))
  if (!selectContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
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

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    })
    return
  }
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  const newContact = { id: v4(), ...req.body }
  const newContacts = [...contacts, newContact]
  const str = JSON.stringify(newContacts)
  await fs.writeFile(contactsPath, str)
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      results: newContact,
    },
  })
}

const removeContact = async (req, res) => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  const { contactId } = req.params
  const index = contacts.findIndex((item) => item.id === Number(contactId))
  if (index === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    })
    return
  }
  const filteredContacts = contacts.filter(
    (item) => item.id !== Number(contactId)
  )
  const str = JSON.stringify(filteredContacts)
  fs.writeFile(contactsPath, str)
  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
  })
}

const updateContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    })
    return
  }
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  const { contactId } = req.params
  const index = contacts.findIndex((item) => item.id === Number(contactId))
  if (index === -1) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    })
    return
  }
  contacts[index] = { id: Number(contactId), ...req.body }
  fs.writeFile(contactsPath, JSON.stringify(contacts))
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts[index],
    },
  })
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
