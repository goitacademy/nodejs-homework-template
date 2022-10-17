const { Contact } = require('../../models/contacts')

const  createError  = require('../../middleware/createError')

const getContactById = async (req, res) => {

    const { id } = req.params

    const reply = await Contact.findById(id)

    if (!reply) {
      throw createError(404)
    }

    res.json(reply)
}

module.exports = getContactById