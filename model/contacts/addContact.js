import db from '../../db/connection'
// import { fileURLToPath } from 'url'
// import path, { dirname } from 'path'

// const __dirname = dirname(fileURLToPath(import.meta.url))
const addContact = async (body) => {
  const client = await db
  const collection = await client.db().collection('contacts')
  const newContact = {
    favorite: false,
    ...body,
  }
  const result = await collection.insertOne(newContact)
  return result
}
export default addContact
