import Contact from "../../model/contact";

const updateContact = async (userId, contactId, body) => {
  try {
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner: userId },
      { ...body },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export default updateContact;
