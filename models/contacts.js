const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')
const { v4 } = require('uuid')

const listContacts = async () => {
  const list = await fs.readFile(contactsPath, 'utf-8')
  const listParse = await JSON.parse(list)
  return listParse
}

const getContactById = async (contactId) => {
  const list = await listContacts()

  // *! Возвращаем 1 контакт по ИД
  const [getById] = await list.filter((item) => {
    return item.id === contactId
  })

  return getById
}

const addContact = async (body) => {
  const randomId = v4()
  const list = await listContacts()

  // *! Записываем в переменую новый контакт

  const newContact = { id: randomId, ...body }
  // *! Пушим в память новый контакт
  list.push(newContact)

  // *! Перезаписываем контакты
  await fs.writeFile(contactsPath, JSON.stringify(list))

  return newContact
}

const removeContact = async (contactId) => {
  const list = await listContacts()

  // *! Поиск по ИД
  const notFindId = list.find((item) => item.id === contactId)
  if (!notFindId) {
    return notFindId
  }

  // *! Ищем по ИД ,и записываем в новый масив без ненужного контакта
  const newContacts = list.filter((item) => item.id !== contactId)

  // *! Перезаписываем контакты
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))

  return newContacts
}

const updateContact = async (contactId, body) => {
  const list = await listContacts()
  const { name, email, phone } = body

  // *! Обновление конткта

  const updatContacts = list.map((item) => {
    if (item.id === contactId) {
      item.name = name
      item.email = email
      item.phone = phone
    }
    return item
  })

  // *! перезапись в файл Contacts.json
  await fs.writeFile(contactsPath, JSON.stringify(updatContacts))

  // *! Поиск по ИД на ошибку
  const notFindId = list.find((item) => item.id === contactId)
  if (!notFindId) {
    return notFindId
  }

  // *! Возвращаем 1 контакт по ИД
  const [getById] = await updatContacts.filter((item) => {
    return item.id === contactId
  })
  return getById
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
