import Contact from "../modal/contact.js";
import mongoose from 'mongoose';
const { Types } = mongoose;


const listContacts = async(userId, {sortBy, sortByDesc, filter,
 limit=10, skip=0}) =>{
   let sortCriteria = null;
    const total = await Contact.find({owner: userId}).countDocuments()
    let result = Contact.find({ owner: userId}).populate({
      path: 'owner', select: 'name email age role'      
    });
    if (sortBy) {
      sortCriteria = {[`${sortBy}`]: 1} //sort to up
    };
    if (sortByDesc) {
      sortCriteria = {[`${sortByDesc}`]: -1} //sort to  down
    };
    if (filter) {
      console.log('fvrefv', result);
      result =  result.select(filter.split('|').join(' '));//name  age  разделили слова фильтра с поисковой строки
    }
    
    result = await result.skip(Number(skip)).limit(Number(limit)).sort(sortCriteria)
return {total, contacts: result}
}

const getcontactById = async(userId, contactId) =>{
  const result = await Contact.findOne({_id: contactId, owner: userId}).populate({
    path: 'owner', select: 'name email age role'      
  });

  return result
};

const removeContact = async(userId, contactId) => {
  const result = await Contact.findOneAndRemove({_id: contactId, owner: userId});
  return result

  }
  
 const addContact = async(userId, body) => {
 const result = Contact.create({...body, owner: userId });
    return result
  };

  const updataContact = async(userId, contactId, body) =>{
     const result = await Contact.findOneAndUpdate(
      {_id: contactId, owner: userId},
       {...body},
       {new: true})
    return result
  }
const getStatisticContacts = async(id) =>{
    // console.log('getStatisticContacts');
    const data = await Contact.aggregate([
      { $match: { owner: Types.ObjectId(id) }},
      { $group: { _id: 'stats',
       totalAge: {$sum: '$age'},
      minAge: {$min: '$age'},
      maxAge: {$max: '$age'},
      avgAge: {$avg: '$age'}
      }},
        ]

    )
    return data
  }

  export default {listContacts, getcontactById, removeContact, addContact, updataContact, getStatisticContacts}
