const User = require('./contactModal');
  /**
   *  func to get contacts
   *  @param {Promise<JSON>}
   */
 const  listContacts = async () => {
   const info = User.find()
    return info
  }
  /** get contacts by ID
   * @param {Number} contactId 
   */
  
  const getContactById = async (contactId) =>  {
    const user = await User.findById(contactId)
    
    return user
  }
  /** func to delete contacts by id 
   * 
   * @param {Number} contactId 
   * @returns {Promise<Object>}
   */
  
  const removeContact = async(id)  =>{
    const deletedUser = await User.findOneAndDelete(id)
    return deletedUser;
  }

  /** func to add contact 
   * 
   * @param {string} name 
   * @param {string} email 
   * @param {string} phone 
   * @returns {Promise<Object>}
   */
  
  const addContact = async (email,subscription,token, password) => {    
    const newContact = {
      subscription,
      email,
      token,
      password 
    };
    const newUser = await User.create(newContact)
    return newUser
  };

  const addContactRegister =  async (email,subscription, password) => {    
    const newContact = {
      subscription : subscription && "starter",
      email,
      password 
    };
    const newUser = await User.create(newContact)
    return newUser
  };



module.exports = {  
    listContacts,
    getContactById,
    removeContact,
    addContact,
    addContactRegister
    

}