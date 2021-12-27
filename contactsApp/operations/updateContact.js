import Contact from "../../model/contact";

const updateContact = async (contactId, body) => {
  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { ...body },
      { new: true }
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
export default updateContact;
