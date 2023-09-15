import Contact from "../../models/Contact.js";
import {ctrlWrapper} from "../../decorators/index.js";

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      {
        new: true,
        runValidators: true,
      }
    );
    // console.log(result);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
  
    res.json(result);
  };
  
  export default {
    
    updateStatusContact: ctrlWrapper(updateStatusContact),
  };
  