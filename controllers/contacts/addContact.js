const Contact = require('../../models/contact');

const addContact = async (req, res) => {
    const { favorite } = req.body;
    if (!favorite) {
      const request = { ...req.body, favorite: false };
      req.body = request;
    }
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
}

module.exports = addContact;