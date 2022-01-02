import Contact from "../../model/contact";

const removeContact = async (userId, contactId) => {
  try {
    const deletedContact = await Contact.findOneAndRemove({ _id: contactId, owner: userId });
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

export default removeContact;
