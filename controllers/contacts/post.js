// const contactsOperation = require("../../model/oldFiles/index");
const { Contact } = require('../../model')

const postContact = async (req, res, next) => {
  try {
    const newProduct = { ...req.body, owner: req.user._id }
    const result = await Contact.create(newProduct)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
  // res.json({ message: "template message" });
}

module.exports = postContact
