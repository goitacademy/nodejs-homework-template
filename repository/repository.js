
const contacts = require('../schemas/contactsSchema')

class ContactRepository {
  constructor() {
    this.model = contacts
  }
  async listContacts({limit = 3, page = 1, favorite = false}, ownerID) {
    const {docs: contacts, totalDocs: total, totalPages} = await this.model.paginate({owner: ownerID},{
      limit,
      page,
      populate: {
        path: "owner",
        select: "email subscription"
      }
    }, (err, res) => {
      
      if(favorite) {
        const result = {
          ...res,
          docs: res.docs.filter(item => item.favorite === true)
        }
        return result
      }
      return res
    })
    return {contacts, total, limit: Number(limit), page: Number(page), totalPages }
  }

  async getById(contactId, ownerID) {
    const data = await this.model.findOne({_id: contactId, owner: ownerID}).populate({
      path: "owner",
      select: "email subscription"
    })
    return data
  }

  async addContact(name, email, phone, userID) {    
    const record = {      
      name,
      email,
      phone,
      owner: userID
    }
    await this.model.create(record)
    return record
  }

  async removeContact(contactId, ownerID) {
    const record = await this.model.findByIdAndRemove({ _id: contactId, owner: ownerID })
    return record
  }

  async updateContact(contactId, body, ownerID) {
    const record = await this.model.findByIdAndUpdate({_id: contactId, owner: ownerID},{...body},{new: true})    
    return record
  }
  async updateStatusContact(contactId, body, ownerID) {
    const record = await this.model.findByIdAndUpdate({_id: contactId, owner: ownerID},{...body},{new: true}) 
    return record
  }
}

module.exports = { ContactRepository }