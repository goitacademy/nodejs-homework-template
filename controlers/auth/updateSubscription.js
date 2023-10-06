import User from '../../schemas/user.js';
import { HttpError } from "../../helpers/HttpErrors.js";
import { ctrlWrapper } from "../../helpers/ctrlWraper.js";

const update = async (req, res, next) => {
  const { id } = req.params
    const { error } = req.body;
  if (error) {
      throw HttpError(400, error.message)
    }
  const result = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });
  console.log(result)
    if (result) {
      res.json({
        status: 'Success',
        code: 200,
        data: { user: result },
      })
    } else {
      throw HttpError(404, error.message)
    }
}

export const updateSubscription = ctrlWrapper(update);