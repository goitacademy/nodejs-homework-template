const Contact = require('../../models/contact');

const add = async (requirement, response, next) => {
  try {
    const { _id: owner } = requirement.user;
    const body = requirement.body;

    const newContact = await Contact.create({...body, owner});

    response.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

module.exports = add;