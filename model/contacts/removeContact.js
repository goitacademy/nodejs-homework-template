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
}
export default removeContact
