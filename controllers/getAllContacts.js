const { Contact } = require("../models/contact")

const getAll = async (req, res, next) => {
  console.log("first")
  const result = await Contact.find()
  console.log("result", result)

  res.json(result)
}

module.exports = getAll