const getAll = require('./getAll')
const getOne = require('./getOne')
const remove = require('./remove')
const add = require('./add')
const update = require('./update')

const contacts = {
  getAll,
  getOne,
  remove,
  add,
  update
}

module.exports = { contacts }
