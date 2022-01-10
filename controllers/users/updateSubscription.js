import { HttpCode } from '../../lib/constants'
import AuthService from '../../services/auth'

const authService = new AuthService()

export const updateSubscription = async (req, res, next) => {
    const { id, subscription } = req.body;
  const { name, email } = await authService.updateUserSubscription(
    id,
    subscription,
  );
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { id, name, email, subscription },
  });
}
