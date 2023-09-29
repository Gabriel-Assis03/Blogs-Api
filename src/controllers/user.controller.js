const mapStatusHTTP = require('../middlewares/mapStatusHTTP');
const { userService } = require('../services');

const getUser = async (req, res) => {
  const { status, data } = await userService.getUser();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.getUserById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const postUser = async (req, res) => {
  const { status, data } = await userService.postUser(req);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getUser,
  postUser,
  getUserById,
};
