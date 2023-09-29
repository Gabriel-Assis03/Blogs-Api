const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateLogin } = require('./validations/validationsInputValues');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const postLogin = async (req) => {
  const error = validateLogin(req.body);
  if (error) return { status: error.status, data: { message: error.message } };
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });
  if (!user) return { status: 'INVALID_KEY', data: { message: 'Invalid fields' } };
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { userId: user.id } }, secret, jwtConfig);
  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  postLogin,
};
