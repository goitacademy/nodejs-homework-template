import Contact from "../../model/contact";

const removeContact = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    return deletedContact;
  } catch (error) {
    console.log(error.message);
  }
};

export default removeContact;
