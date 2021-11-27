// const fs = require('fs/promises');
// const filePath = require('./filePath');
const {Contact} = require('../model/contact');

const getAll = async (_, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json({
      status: 'success',
      code: 200,
      data: contacts,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getAll;
