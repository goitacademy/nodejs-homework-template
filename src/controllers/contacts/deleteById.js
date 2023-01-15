const express = require('express')
const router = express.Router()
const {removeContact} = require('../../models');


const deleteById = router.delete('/:contactId', async (req, res, next) => {

    const {body} = req.body;
    const id = req.body.id;
    const data = await removeContact(body);
    if (!data) {
      return res.status(404).json({ error: "User does not exist" });
    }
  
    res.status(200).json({
      status: `User with id ${id} was removed` ,
      code: 200,
      data,
    });
  });

module.exports = deleteById();