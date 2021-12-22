import db from '../../db/connection'
import { ObjectId } from 'mongodb'

const getContactById = async (id) => {
  const client = await db
  const collection = await client.db().collection('contacts')
  const idContact = ObjectId(id)
  const [result] = await collection.find({ _id: idContact }).toArray()
  return result
}
export default getContactById
