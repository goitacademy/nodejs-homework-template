// created by Irina Shushkevych
const { v4 } = require('uuid')

const getId = async () => {
  // const data = await getContacts()
  // const id = data.reduce((total, el) => Math.max(Number(el.id), total), 0) + 1
  // return id.toString()
  return v4()
}

module.exports = getId
