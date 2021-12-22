// import { fileURLToPath } from 'url'
// import path, { dirname } from 'path'
// const __dirname = dirname(fileURLToPath(import.meta.url))
const updateContact = async (id, body) => {
  const client = await db
  const collection = await client.db().collection('contacts')
  const idContact = ObjectId(id)
  const { value: result } = await collection.findOneAndDelete(
    { _id: idContact },
    { $set: body },
  )
  return result
  // const index = contacts.findIndex((contact) => contact.id === id)
  // if (index !== -1) {
  //   const updatedContact = { id: randomUUID(), ...contacts[index], ...body }
  //   contacts[index] = updatedContact
  //   await fs.writeFile(
  //     path.join(__dirname, 'contacts.json'),
  //     JSON.stringify(contacts, null, 2),
  //   )
  //   return updatedContact
  // }
  // return null
}
export default updateContact
