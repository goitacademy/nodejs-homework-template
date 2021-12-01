// const gravatar = require("gravatar");
// const fs = require("fs/promises");
// const path = require("path");
const { Contact } = require('../../model')

// const contactsDir = path.join(__dirname, "../../public/avatar");

const postContact = async (req, res, next) => {
  try {
    const newProduct = { ...req.body, owner: req.user._id }
    const result = await Contact.create(newProduct)
    // const contactsFolder = path.join(contactsDir, String(result._id));
    // await fs.mkdir(contactsFolder);
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
}

module.exports = postContact
