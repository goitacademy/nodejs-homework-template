const { Contact } = require("../../models/contact");

const postController = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  postController,
};
