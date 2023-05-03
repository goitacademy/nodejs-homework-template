const {basedir} = global
const Contacts = require(`${basedir}/models/contacts`)

const updateContact = async (req, res) => {
      const contact = await Contacts.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
      if(contact) {
        return res.status(201).json({ status: 'success', code: 201, data: {contact}})
      }
      return res.status(404).json({ status: 'error', code: 404, message: 'Missing fields'})
  }

  module.exports = updateContact