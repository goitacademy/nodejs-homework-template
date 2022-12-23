const {Contacts} = require("../../models/contactModel")

const getAll = async (req, res, next) => {

  const result = await Contacts.find()

  res.json(result)
}

module.exports = getAll