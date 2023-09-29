const { User } = require('../models');
const { validateUser } = require('./validations/validationsInputValues');
const { creatToken } = require('../middlewares/token');

const getUser = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { status: 'SUCCESSFUL', data: users };
};

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
  const token = creatToken(newUser.id);
  return { status: 'CREATED', data: { token } };
};

module.exports = {
  postUser,
  getUser,
};
