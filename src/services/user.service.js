const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateUser } = require('./validations/validationsInputValues');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

const postUser = async (req) => {
  const error = await validateUser(req.body);
  if (error) return { status: error.status, data: { message: error.message } };
  const { displayName, email, password, image } = req.body;
  const newUser = await User.create({
    displayName,
    email,
    password,
    image,
  });
  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { userId: newUser.id } }, secret, jwtConfig);
  return { status: 'CREATED', data: { token } };
};

module.exports = {
  postUser,
};
