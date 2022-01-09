import Contact from "../modal/contact.js";

const listContacts = async({sortBy, sortByDesc, filter,
 limit=10, skip=0}) =>{
   let sortCriteria = null;
    const total = await Contact.find().countDocuments()
    let result = Contact.find();
    if (sortBy) {
      sortCriteria = {[`${sortBy}`]: 1} ;
    };
    if (sortByDesc) {
      sortCriteria = {[`${sortByDesc}`]: -1} ;
    };
    if (filter) {
      console.log('fvrefv', result);
      result =  result.select(filter.split('|').join(' '));
    }
    
    result = await result.skip(Number(skip)).limit(Number(limit)).sort(sortCriteria)
return {total, contacts: result}
}

const getcontactById = async(contactId) =>{
  const result = await Contact.findById(contactId);
  return result
};

const removeContact = async(contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result

  }
  
 const addContact = async(body) => {
 const result = Contact.create(body);
    return result
  };

  const updataContact = async(contactId, body) =>{
    console.log(contactId, body);
     const result = await Contact.findByIdAndUpdate(
      contactId,
       {...body},
       {new: true
      })
    return result
  }

  const updateStatusFav = async(contactId, body) =>{
     const result = await Contact.findByIdAndUpdate(
      contactId,
       {...body},
       {new: true
      })
    return result
  }

  export default {listContacts, getcontactById, removeContact, addContact, updataContact, updateStatusFav}
