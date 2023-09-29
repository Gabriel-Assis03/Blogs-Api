const { User } = require('../models');
const { validateLogin } = require('./validations/validationsInputValues');
const { creatToken } = require('../middlewares/token');

const postLogin = async (req) => {
  const error = validateLogin(req.body);
  if (error) return { status: error.status, data: { message: error.message } };
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { status: 'INVALID_KEY', data: { message: 'Invalid fields' } };
  const token = creatToken(user.id);
  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  postLogin,
};
