const express = require('express')
const router = express.Router()
const {addContact} = require('../../models/contacts/addContact');


const addById = router.get('/', async (req, res, next) => {

    const {body} = req.body;
    const data = await addContact(body);
    res.status(200).json({
      status: "success",
      code: 200,
      data,
    });
  });

module.exports = addById();