const express = require('express')
const router = express.Router()
const {listContact} = require('../../models');


const getAll = router.get('/', async (req, res, next) => {

    const {body} = req.body;
    const data = await listContact(body);
    res.status(200).json({
      status: "success",
      code: 200,
      data,
    });
  });

module.exports = getAll();