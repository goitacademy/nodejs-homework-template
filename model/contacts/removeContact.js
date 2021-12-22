import db from '../../db/connection'
import { ObjectId } from 'mongodb'

const removeContact = async (id) => {
  const client = await db
  const collection = await client.db().collection('contacts')
  const idContact = ObjectId(id)
  const { value: result } = await collection.findOneAndDelete({
    _id: idContact,
  })
  return result
  // const index = contacts.findIndex((contact) => contact.id === id)
  // if (index !== -1) {
  //   const result = contacts.splice(index, 1)

  //   await fs.writeFile(
  //     path.join(__dirname, 'contacts.json'),
  //     JSON.stringify(contacts, null, 2),
  //   )
  //   return result
  // }
  // return null
}
export default removeContact
