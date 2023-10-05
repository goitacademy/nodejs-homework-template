import {ctrlWrapper} from "../../decorators/index.js";

const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    res.json({
      email,
      subscription,
    });
  };
  
  export default ctrlWrapper(getCurrent);