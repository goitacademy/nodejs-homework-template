const path = require('path');
const fs = require('fs').promises;
const shortid = require('shortid');

 
 const contactsPath = path.join('models', 'contacts.json');
  /**
   *  func to get contacts
   *  @param {Promise<JSON>}
   */
 const  listContacts = async () => {
    const readRes = await fs.readFile(contactsPath);
    const infoJs = JSON.parse(readRes)
    return infoJs
  }
  /** get contacts by ID
   * @param {Number} contactId 
   */
  
  const getContactById = async (contactId) =>  {
    const list = await Contacts()
    const contact = list.find(item => item.id === `${contactId}`)
    return contact
  }
  /** func to delete contacts by id 
   * 
   * @param {Number} contactId 
   * @returns {Promise<Object>}
   */
  
  const removeContact = async(contactId)  =>{
    const list = await Contacts()
    const index = list.findIndex((item) => item.id === contactId)
    const removed = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return removed[0];
  }

  /** func to add contact 
   * 
   * @param {string} name 
   * @param {string} email 
   * @param {string} phone 
   * @returns {Promise<Object>}
   */
  
  const addContact = async (name, email, phone) => {
    const list = await Contacts();
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone
    };
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    
    return newContact;
    
  };

  const Contacts = async() =>{
    const readRes = await fs.readFile(contactsPath);
    const infoJs = JSON.parse(readRes)
    return infoJs
  }

  

  
module.exports = {  
    listContacts,
    getContactById,
    removeContact,
    addContact,
    Contacts

}