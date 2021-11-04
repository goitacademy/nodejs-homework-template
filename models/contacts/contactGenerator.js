const contactGenerator = (name, email, phone) => {
  const idGenerator = () => {
    const now = new Date()
    const id = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`
    return Number(id)
  }

  const newContact = {
    id: idGenerator(),
    name,
    email,
    phone
  }
  return newContact
}
module.exports = contactGenerator
