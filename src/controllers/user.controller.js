const mapStatusHTTP = require('../middlewares/mapStatusHTTP');
const { userService } = require('../services');

const postUser = async (req, res) => {
  const { status, data } = await userService.postUser(req);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  postUser,
};
