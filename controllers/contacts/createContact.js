const {basedir} = global
const Contacts = require(`${basedir}/models/contacts`)

const createContact = async (req, res) => {
    const {id: owner} = req.user
    const contact = await Contacts.create({...req.body, owner})
    res.status(201).json({ status: 'success', code: 201, data: {contact}})
  }

  module.exports = createContact