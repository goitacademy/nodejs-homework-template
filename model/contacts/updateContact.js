import db from '../../db/connection'
import { ObjectId } from 'mongodb'
const updateContact = async (id, body) => {
  const client = await db
  const collection = await client.db().collection('contacts')
  const idContact = ObjectId(id)
  const { value: result } = await collection.findOneAndUpdate(
    { _id: idContact },
    { $set: body },
    // {returnDocument:'after'}
  )
  return result
}
export default updateContact
